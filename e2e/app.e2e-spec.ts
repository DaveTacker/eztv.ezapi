import { EztvBuddyPage } from './app.po';

describe('eztv-buddy App', function() {
  let page: EztvBuddyPage;

  beforeEach(() => {
    page = new EztvBuddyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
