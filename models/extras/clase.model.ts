import fs from 'fs'
import path from 'path'

export class ClaseModel {
  private idMateria: string
  private nombre: string
  private cuatrimestre: number

  private static filePath = path.join(
    __dirname,
    '../../data/extras/materias.json'
  )

  constructor(data: any) {
    this.idMateria = data.idMateria
    this.nombre = data.nombre
    this.cuatrimestre = data.cuatrimestre
  }

  public getIdMateria(): string {
    return this.idMateria
  }

  public static async getAllRaw(): Promise<any[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public static async saveAll(materias: any[]): Promise<boolean> {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(materias, null, 4),
        'utf8'
      )
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
