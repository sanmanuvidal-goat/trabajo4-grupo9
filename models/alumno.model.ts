import { PersonaModel } from "./persona.model"
import fs from 'fs';
import path from 'path';

export class AlumnoModel extends PersonaModel {

  private legajo: number
  private fechaAlta: string
  private modificacion: string
  private isActive: boolean

  // Ruta absoluta para no tener problemas de directorios al ejecutar con nodemon
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

  // --- MÉTODOS ESTÁTICOS DE PERSISTENCIA ---

  // Lee el archivo JSON y devuelve un array de objetos planos
  public static getAllRaw(): any[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      return [];
    }
  }

  // Guarda la lista completa en el archivo JSON
  public static saveAll(alumnos: any[]): boolean {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(alumnos, null, 4), 'utf8');
      return true;
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error);
      return false;
    }
  }
}