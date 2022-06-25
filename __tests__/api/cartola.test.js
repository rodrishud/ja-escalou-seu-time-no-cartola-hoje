const axios = require('axios')
const { BASE_URL, fetchMarketStatus } = require('../../src/api/cartola')

jest.mock("axios")

describe('get "mercado status"', () => {
    it('should return status and datetime limit', async () => {
        const mockResponse = {
            status_mercado: 1,
            fechamento: {
                dia: 25,
                mes: 6,
                ano: 2022,
                hora: 16,
                minuto: 0,
                timestamp: 1656183600
            }
        }

        axios.get.mockResolvedValueOnce({ data: mockResponse })

        const result = await fetchMarketStatus()

        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/mercado/status`)
        expect(result).toEqual(mockResponse)
    })

    it('should return an error on get the information', async () => {
        const message = "Network Error"
        const mockResponse = new Error(message)

        axios.get.mockRejectedValueOnce(mockResponse)

        const result = await fetchMarketStatus()

        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/mercado/status`)
        expect(result).toEqual(mockResponse)
    })
})