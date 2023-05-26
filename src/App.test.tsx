import { describe, it, expect } from 'vitest';
import App from "./App"

describe('App Component', () => {
    it('Should render correctly', () => {
        const component = <App />
        expect(component).toMatchSnapshot();
    })
});