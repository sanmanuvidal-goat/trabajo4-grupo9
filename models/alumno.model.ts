import { PersonaModel } from "./persona.model"
import fs from 'fs';
import path from 'path';

export class AlumnoModel extends PersonaModel {

  private legajo: number
  private fechaAlta: string
  private modificacion: string
  private isActive: boolean

  private static filePath = path.join(__dirname, '../data/alumnos.json');

  constructor(data: any) {

    super(
      data.nombre,
      data.apellido,
      data.email
    )

    this.legajo = data.legajo
    this.fechaAlta = data.fechaAlta
    this.modificacion = data.modificacion
    this.isActive = data.isActive

  }

  public getLegajo(): number {
    return this.legajo
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

  public static async saveAll(alumnos: any[]): Promise<boolean> {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(alumnos, null, 4),
        'utf8'
      );
      return true;
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error);
      return false;
    }
  }
}