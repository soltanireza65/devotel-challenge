import { HttpStatus, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';

export abstract class AbstractJobOfferProviderAdapter {
  abstract logger: Logger;

  protected async fetchWithRetry<TResponse>({
    fetchFn,
    delay = 1000,
    maxRetries = 5,
  }: {
    fetchFn: () => Promise<AxiosResponse<TResponse>>;
    maxRetries?: number;
    delay?: number;
  }) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const { status, data } = await fetchFn();
        if (status === HttpStatus.OK) {
          return data;
        } else if (status >= 500) {
          throw new Error(`Server error: ${status}`);
        } else {
          return null; // No need to retry for client errors (e.g., 404)
        }
      } catch (error: any) {
        this.logger.error(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt === maxRetries) throw error;

        const backoff = delay * 2 ** (attempt - 1) + Math.random() * 100;
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }

    return null;
  }
}
