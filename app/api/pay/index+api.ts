import {MakeCashiaPayment} from '@/utils'
export async function GET(req: Request, res: Response) {
    
    
}

export async function POST(req:Request) {
    const { amount, payer } = await req.json()
    // console.log(title, description)
    const resp = await MakeCashiaPayment(amount,payer)
    return Response.json(resp)
}