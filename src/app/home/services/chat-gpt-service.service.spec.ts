import { TestBed } from '@angular/core/testing';

import { ChatGptService } from './chat-gpt-service.service';

describe('ChatGptServiceService', () => {
  let service: ChatGptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
