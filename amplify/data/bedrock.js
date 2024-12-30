import { createTextChangeRange } from "typescript";

export function request(ctx) {
    const { ingredients = [] } = ctx.args;
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(",")}.`;
    return {
        resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `\n\nHuman: ${prompt}\n\nAssistant`,
                            },
                        ],
                    },
                ],
            }),
        },
    };
}

export function response(ctx) {
    const parseBody = JSON.parse(ctx.result.body); // parse the response body
    const res = {
        body: parseBody.content[0].text,
    }; // extract the text content from the response
    return res;
}