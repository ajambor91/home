import {ServiceAbstract} from "../core/abstract/service.abstract";

export class RestApiClient extends ServiceAbstract{
  public async translateCategory(categoryName: string) {
    const response = await fetch('https://example.com/api', {
      method: 'POST',
      body: JSON.stringify({ key: 'value' }),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json()
  }
}
