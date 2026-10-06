const { neon } = require('@neondatabase/serverless');

async function run() {
  const sql = neon('postgresql://neondb_owner:npg_HIPUQ7Eye6gW@ep-aged-cell-b88cpfl9-pooler.c-14.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require');
  const count = await sql`SELECT COUNT(*) FROM aparatur WHERE kategori = 'wakil_lingkungan'`;
  
  if (parseInt(count[0].count) === 0) {
    for (let i = 1; i <= 13; i++) {
      await sql`INSERT INTO aparatur (kategori, jabatan, nama, nip, urutan) VALUES ('wakil_lingkungan', 'Wakil Kepala Lingkungan ' || ${i}, 'Nama Wakil Pala', '', ${20 + i})`;
    }
    console.log('Inserted 13 Wakil Pala');
  } else {
    console.log('Wakil Pala already exists');
  }
}

run();
