import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          orderBy: {
            isDefault: 'desc',
          },
        },
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `Product with slug '${slug}' not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product details',
      },
      { status: 500 }
    );
  }
}
