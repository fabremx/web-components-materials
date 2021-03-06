import { render } from '../../utils'
import { Header } from './header'

it('should render "Web Components Bets Application"', () => {
    const header = render(Header)
    expect(header.shadowRoot?.querySelector('.header__title')?.textContent).toBe('Bets - Paris Sportif en ligne')
})