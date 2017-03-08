import { SupersalesPage } from './app.po';

describe('supersales App', function() {
  let page: SupersalesPage;

  beforeEach(() => {
    page = new SupersalesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
