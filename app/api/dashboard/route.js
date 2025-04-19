import { PrismaClient } from '@/app/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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
    
    // Get all reports first
    const reports = await prisma.nGOReport.findMany({
      where: whereClause,
      orderBy: {
        month: 'desc',
      },
    });
    
    // Calculate totals
    const uniqueNGOs = new Set(reports.map(report => report.ngoId));
    const totalNGOs = uniqueNGOs.size;
    
    const totals = reports.reduce((acc, report) => {
      acc.peopleHelped += report.peopleHelped || 0;
      acc.eventsConducted += report.eventsConducted || 0;
      acc.fundsUtilized += report.fundsUtilized || 0;
      return acc;
    }, { peopleHelped: 0, eventsConducted: 0, fundsUtilized: 0 });
    
    const result = {
      totalNGOs,
      totalPeopleHelped: totals.peopleHelped,
      totalEventsConducted: totals.eventsConducted,
      totalFundsUtilized: totals.fundsUtilized,
      reports,
    };
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}