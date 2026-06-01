import fs from 'fs';
import path from 'path';

export class NotaModel {

  private id: number;
  private legajo: number;
  private idMateria: string;
  private nota: number;
  private fecha: string;

  private static filePath = path.join(__dirname, '../../data/extras/notas.json');

  constructor(data: any) {
    this.id = data.id;
    this.legajo = data.legajo;
    this.idMateria = data.idMateria;
    this.nota = data.nota;
    this.fecha = data.fecha;
  }

  public getId(): number {
    return this.id;
  }

  public static async getAllRaw(): Promise<any[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static async saveAll(notas: any[]): Promise<boolean> {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(notas, null, 4),
        'utf8'
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}