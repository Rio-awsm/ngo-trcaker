import { PrismaClient } from '@/app/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    
    const report = await prisma.nGOReport.create({
      data: {
        ngoId: data.ngoId,
        ngoName: data.ngoName,
        month: new Date(`${data.month}-01`),
        peopleHelped: data.peopleHelped,
        eventsConducted: data.eventsConducted,
        fundsUtilized: data.fundsUtilized,
      },
    });
    
    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get('month');
    
    let whereClause = {};
    if (monthParam) {
      const [year, month] = monthParam.split('-');
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      
      whereClause = {
        month: {
          gte: startDate,
          lte: endDate,
        },
      };
    }
    
    const reports = await prisma.nGOReport.findMany({
      where: whereClause,
      orderBy: {
        month: 'desc',
      },
    });
    
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}