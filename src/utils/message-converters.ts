import { Message, MessageConverter, Role } from '../types';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';

/**
 * Implements the MessageConverter interface for converting OpenAI messages.
 */
export class OpenAIMessageConverter implements MessageConverter {
  /**
   * Converts an OpenAI message to a standardized Message format.
   * @param m - The input message to be converted.
   * @returns A standardized Message object.
   */
  convert(m: ChatCompletionMessageParam): Message {
    if (m.role === 'tool') {
      return {
        role: Role.tool,
        content: JSON.stringify({ tool_call_id: m.tool_call_id, content: m.content }),
      };
    } else if (m.role === 'function') {
      return {
        role: Role.function,
        content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
      };
    } else {
      return {
        role: Role[m.role as keyof typeof Role],
        content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content || {}),
      };
    }
  }
}
