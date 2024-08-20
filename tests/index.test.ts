import * as index from '../src/index'
import * as embed from '../src/embed'

jest.mock('@actions/core')
jest.mock('../src/embed')
// Mock the action's entrypoint
const runMock = jest.spyOn(embed, 'makeEmbed').mockImplementation();

describe('index', () => {
  it('calls the corresponding functions when imported', async () => {
    await index.run();
    expect(runMock).toHaveBeenCalled();
  })
})