import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Resets the SQLite test database by clearing all transactional tables,
 * resetting auto-increment counters, and cleaning the mock uploads directory.
 */
export function resetDatabase(): void {
  const dbPath = `C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`;
  const uploadsDir = `C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\uploads`;

  console.log(`Connecting to database at: ${dbPath}`);
  const db = new Database(dbPath);
  db.pragma('busy_timeout = 5000');

  try {
    // Temporarily disable foreign keys to allow clearing tables without violation errors
    db.pragma('foreign_keys = OFF');
    console.log('Foreign keys temporarily disabled.');

    // Ensure all rate plans are visible on the web so the E2E test wizard can select them
    const plansTableExists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='planes_tarifa'`).get();
    if (plansTableExists) {
      db.prepare("UPDATE planes_tarifa SET visible_web = 1").run();
      console.log('Set all rate plans as visible_web = 1.');
    }

    const tables = [
      'documentos_reserva',
      'solicitudes_modificacion',
      'reversiones_log',
      'notificaciones_log',
      'huespedes_reserva',
      'folio_hotel',
      'reservas_hotel',
      'huespedes'
    ];

    // Execute the table clearing and auto-increment resets in a single transaction
    const clearTables = db.transaction(() => {
      for (const table of tables) {
        // For robustness, check if table exists before deleting
        const tableExists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(table);
        if (tableExists) {
          db.prepare(`DELETE FROM ${table}`).run();
          console.log(`Cleared table: ${table}`);
        } else {
          console.log(`Table ${table} does not exist. Skipping delete.`);
        }
      }

      // Check if sqlite_sequence exists before trying to clear it
      const seqExists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='sqlite_sequence'`).get();
      if (seqExists) {
        db.prepare(`DELETE FROM sqlite_sequence WHERE name IN (${tables.map(() => '?').join(',')})`).run(...tables);
        console.log('Reset auto-increment counters in sqlite_sequence.');
      }
    });

    clearTables();
    console.log('Database tables cleared transactionally.');

    // Clean mock comprobante files from the uploads directory
    if (fs.existsSync(uploadsDir)) {
      console.log(`Cleaning uploads directory at: ${uploadsDir}`);
      const files = fs.readdirSync(uploadsDir);
      let deletedCount = 0;
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      }
      console.log(`Deleted ${deletedCount} files from uploads directory.`);
    } else {
      console.log(`Uploads directory does not exist at: ${uploadsDir}. Skipping file cleanup.`);
    }
  } catch (error) {
    console.error('Error during database reset:', error);
    throw error;
  } finally {
    // Re-enable foreign keys
    db.pragma('foreign_keys = ON');
    console.log('Foreign keys re-enabled.');
    
    // Close the connection cleanly
    db.close();
    console.log('Database connection closed cleanly.');
  }
}

