import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const params = new URLSearchParams({
      amount: body.amount,
      orderId: body.orderId,
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      address: body.address,
      productId: body.productId,
      productName: body.productName,
      size: body.size || '',
      deliveryMethod: body.deliveryMethod,
      paymentMethod: body.paymentMethod,
    });
    
    const paymentUrl = `http://localhost:3000/pay?${params.toString()}`;
    
    return NextResponse.json({ 
      success: true, 
      paymentUrl: paymentUrl,
    });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка создания платежа' });
  }
}