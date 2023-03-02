import { render, screen } from "@testing-library/react"
import Calculator from "../components/Calculator"
import  userEvent from "@testing-library/user-event"

describe("Calculator", () => {
    test("deve renderizar corretamente a aplicação com os dígitos de operações +, -, * e /", () => {
        render(<Calculator/>)

        const sumBtn = screen.getByText(/\+/i)
        const minusBtn = screen.getByText(/\-/i)
        const multBtn = screen.getByText(/\*/i)
        const divBtn = screen.getByText(/\//i)

        expect(sumBtn).toBeInTheDocument()
        expect(minusBtn).toBeInTheDocument()
        expect(multBtn).toBeInTheDocument()
        expect(divBtn).toBeInTheDocument()
    })

    test("deve multiplicar dois dígitos numéricos corretamente", async () => {
        const user = userEvent.setup()

        render(<Calculator/>)

        const n5Btn = screen.getByText(/5/i)
        const n2Btn = screen.getByText(/2/i)
        const multBtn = screen.getByText(/\*/i)
        const equalBtn = screen.getByText(/\=/i)

        await user.click(n5Btn)
        await user.click(multBtn)
        await user.click(n2Btn)
        await user.click(equalBtn)

        const result = screen.getByTestId("result")
        expect(result).toHaveTextContent("10")
    })

    test("deve dividir dois dígitos numéricos corretamente", async () => {
        const user = userEvent.setup()

        render(<Calculator/>)

        const n6Btn = screen.getByText(/6/i)
        const n2Btn = screen.getByText(/2/i)
        const divBtn = screen.getByText(/\//i)
        const equalBtn = screen.getByText(/\=/i)

        await user.click(n6Btn)
        await user.click(divBtn)
        await user.click(n2Btn)
        await user.click(equalBtn)

        const result = screen.getByTestId("result")
        expect(result).toHaveTextContent("3")
    })

    test("deve concatenar operações corretamente", async () => {
        const user = userEvent.setup()

        render(<Calculator/>)

        const n5Btn = screen.getByText(/5/i)
        const n2Btn = screen.getByText(/2/i)
        const n1Btn = screen.getByText(/1/i)
        const n0Btn = screen.getByTestId("zero-button")
        const multBtn = screen.getByText(/\*/i)
        const sumBtn = screen.getByText(/\+/i)
        const equalBtn = screen.getByText(/\=/i)

        await user.click(n5Btn)
        await user.click(multBtn)
        await user.click(n2Btn)
        await user.click(sumBtn)
        await user.click(n1Btn)
        await user.click(n0Btn)
        await user.click(equalBtn)

        const result = screen.getByTestId("result")
        expect(result).toHaveTextContent("20")
    })    
})