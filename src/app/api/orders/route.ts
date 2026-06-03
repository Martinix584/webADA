import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      client_type,
      name,
      phone,
      delivery_method,
      address,
      zone,
      schedule,
      notes,
      products,
      total
    } = body;

    if (!name || !phone || !products || !total) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          client_type: client_type || 'hogar',
          name,
          phone,
          delivery_method: delivery_method || 'delivery',
          address,
          apt: null,
          zone,
          schedule,
          notes,
          products,
          total,
          status: 'pendiente',
          created_at: new Date().toISOString()
        }])
        .select('id')
        .single();

      if (error) throw error;
      
      return NextResponse.json(
        { success: true, order_id: data?.id, message: 'Pedido registrado correctamente.' },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('[orders] Supabase error:', dbError);
      
      // Dev mode fallback
      if (process.env.SUPABASE_URL === undefined) {
        return NextResponse.json(
          { success: true, order_id: 888, message: 'Pedido registrado (Demo Mode).' },
          { status: 201 }
        );
      }
      
      return NextResponse.json(
        { error: 'Error al guardar el pedido. Intentá de nuevo.' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
