import { formatAttributeValue, render } from '../../utils'
import { BettingItem } from './betting-item'

let bettingItem: HTMLElement
const DUMMY_GAME_ODDS = {
  gameId: 'gameId',
  team1: 'team1',
  team2: 'team2',
  oddsTeam1: 1,
  oddsDraw: 2,
  oddsTeam2: 3,
}

describe('BettingItem Component', () => {
  beforeEach(() => {
    bettingItem = render(BettingItem)
    bettingItem.setAttribute('game-odds', formatAttributeValue(DUMMY_GAME_ODDS))
  })

  it('should render component with unselected odds buttons', () => {
    const selectedButtons = bettingItem.shadowRoot?.querySelectorAll('.betting-item__odds button.selected')

    expect(selectedButtons?.length).toBe(0)
  })

  it('should select odds button "Team1 1.52" when user clicks on it', () => {
    const firstOddsButton = bettingItem.shadowRoot?.querySelector('div.betting-item__odds > button:nth-child(1)') as HTMLElement
    firstOddsButton.click()

    expect(firstOddsButton.classList.contains('selected')).toBeTruthy()
  })

  it('should unselect other buttons and select odds button "Draw 3.45" when user clicks on it', () => {
    const buttons = bettingItem.shadowRoot?.querySelectorAll('.betting-item__odds button') as NodeListOf<HTMLElement>

    buttons[0].click() // Click on first button
    buttons[1].click() // Update by clicking on second button

    expect(buttons[0].classList.contains('selected')).toBeFalsy()
    expect(buttons[1].classList.contains('selected')).toBeTruthy()
  })

  it('should emit "data" when user clicks on the odds button', () => {
    const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent')

    const firstOddsButton = bettingItem.shadowRoot?.querySelector('.betting-item__odds button:first-child') as HTMLElement
    firstOddsButton.click()

    const expectedBetChoice = (spyDispatchEvent.mock.calls[0][0] as CustomEvent).detail
    expect(expectedBetChoice).toEqual({ gameOdds: DUMMY_GAME_ODDS, betChoice: 'TEAM_1_WINS' })
  })
})
