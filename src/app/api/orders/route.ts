import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        variant: {
          include: {
            product: true,
          },
        },
        emiPlan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders from database',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      variantId,
      emiPlanId,
    } = body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !variantId || !emiPlanId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required checkout fields: customerName, customerEmail, customerPhone, shippingAddress, variantId, emiPlanId are all required.',
        },
        { status: 400 }
      );
    }

    // Verify variant and emiPlan exist
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });

    if (!variant) {
      return NextResponse.json(
        { success: false, error: 'Invalid product variant ID' },
        { status: 404 }
      );
    }

    const emiPlan = await prisma.emiPlan.findUnique({
      where: { id: emiPlanId },
    });

    if (!emiPlan) {
      return NextResponse.json(
        { success: false, error: 'Invalid EMI plan ID' },
        { status: 404 }
      );
    }

    // Generate unique order number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `1FI-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        variantId,
        emiPlanId,
        totalAmount: variant.price,
        monthlyEmi: emiPlan.monthlyAmount,
        tenureMonths: emiPlan.tenureMonths,
        status: 'CONFIRMED',
      },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
        emiPlan: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully!',
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order. Please try again.',
      },
      { status: 500 }
    );
  }
}
