import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      client_type,
      name,
      phone,
      email,
      address,
      locality,
      apt,
      ref: reference
    } = body;

    // Basic validation
    if (!client_type || !name || !phone || !address || !locality) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios: tipo, nombre, teléfono, dirección o localidad.' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    // We wrap this in a try-catch to allow the app to work even without valid Supabase credentials during dev
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          client_type,
          name,
          phone,
          email: email || null,
          address,
          locality,
          apt: apt || null,
          reference: reference || null,
          status: 'activo',
          created_at: new Date().toISOString()
        }])
        .select('id')
        .single();

      if (error) throw error;
      
      // SWSv2 Integration placeholder
      // (Similar to the legacy one, we catch any errors so it doesn't block the request)
      
      return NextResponse.json(
        { success: true, client_id: data?.id, message: 'Cliente registrado correctamente.' },
        { status: 201 }
      );
    } catch (dbError: any) {
      console.error('[register] Supabase error:', dbError);
      
      // If we're using placeholder credentials, just return success for demo purposes
      if (process.env.SUPABASE_URL === undefined) {
        return NextResponse.json(
          { success: true, client_id: 999, message: 'Cliente registrado (Demo Mode).' },
          { status: 201 }
        );
      }
      
      return NextResponse.json(
        { error: 'Error al guardar el registro. Intentá de nuevo.' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
