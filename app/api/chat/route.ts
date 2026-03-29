export async function POST(req: Request) {
  const { message } = await req.json();

  // 1. Define the tool the AI can use
  const tools = [
    {
      type: "function",
      function: {
        name: "get_order_status",
        description:
          "Retrieves the shipping status, estimated delivery, and total price of a user's order.",
        parameters: {
          type: "object",
          properties: {
            orderId: {
              type: "string",
              description:
                "The unique order ID or order number, usually a 4-digit number like '1001'.",
            },
          },
          required: ["orderId"],
        },
      },
    },
  ];

  // Helper function to fetch from Groq
  const makeGroqRequest = async (
    messagesArray: Array<{
      role: string;
      content?: string | null;
      name?: string;
      tool_call_id?: string;
      tool_calls?: unknown[];
    }>,
  ) => {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: messagesArray,
          tools: tools,
          tool_choice: "auto",
        }),
      },
    );
    return response;
  };

  // 2. Setup the initial conversation context
  const messages: Array<{
    role: string;
    content?: string | null;
    name?: string;
    tool_call_id?: string;
    tool_calls?: unknown[];
  }> = [
    {
      role: "system",
      content:
        "You are a helpful e-commerce assistant. If a user asks about an order, ALWAYS use the `get_order_status` tool to look it up using the order ID. Do not make up order data. If the order is not found, politely tell them.",
    },
    {
      role: "user",
      content: message,
    },
  ];

  // 3. Make the first request to the LLM
  const response = await makeGroqRequest(messages);
  const data = await response.json();

  if (!response.ok) {
    console.error("Groq API Error:", data);
    return Response.json(
      { reply: "API Error: " + (data.error?.message || "Unknown error") },
      { status: response.status },
    );
  }

  const responseMessage = data.choices[0].message;

  // 4. Check if the LLM decided it NEEDS to use a tool to answer the user
  if (responseMessage.tool_calls) {
    console.log(
      "LLM called a tool:",
      responseMessage.tool_calls[0].function.name,
    );

    // Add the assistant's tool-calling message to the conversation history
    messages.push(responseMessage);

    // Execute every tool the LLM requested
    for (const toolCall of responseMessage.tool_calls) {
      if (toolCall.function.name === "get_order_status") {
        const args = JSON.parse(toolCall.function.arguments);
        const orderId = args.orderId;

        // --- MOCK DATABASE ---
        const ORDERS_DB: Record<string, { status: string; estimatedDelivery: string; total: string }> = {
          "1001": {
            status: "Shipped",
            estimatedDelivery: "Tomorrow",
            total: "$120.00",
          },
          "1002": {
            status: "Processing",
            estimatedDelivery: "Next Tuesday",
            total: "$45.50",
          },
          "1003": {
            status: "Cancelled",
            estimatedDelivery: "N/A",
            total: "$89.99",
          },
        };

        // Perform the backend action (e.g. database query)
        const orderData = ORDERS_DB[orderId] || {
          error:
            "Order not found. Ask the user to verify their 4-digit order ID.",
        };

        // Add the result of the tool back into the messages array
        messages.push({
          tool_call_id: toolCall.id,
          role: "tool",
          name: "get_order_status",
          content: JSON.stringify(orderData),
        });
      }
    }

    // 5. Send the conversation back to the LLM with the new Database information!
    const finalResponse = await makeGroqRequest(messages);
    const finalData = await finalResponse.json();

    if (!finalResponse.ok) {
      return Response.json(
        { reply: "Error finalizing tool request." },
        { status: 500 },
      );
    }

    return Response.json({
      reply: finalData.choices[0].message.content,
    });
  } else {
    // The LLM didn't need to use a tool (e.g. they just said "Hello")
    return Response.json({
      reply: responseMessage.content || "No response choices returned.",
    });
  }
}
