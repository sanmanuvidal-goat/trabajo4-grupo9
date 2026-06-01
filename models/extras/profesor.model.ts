import fs from 'fs'
import path from 'path'

export class ProfesorModel {
  private id: number
  private nombre: string
  private apellido: string
  private email: string
  private fechaAlta: string
  private isActive: boolean

  private static filePath = path.join(
    __dirname,
    '../../data/extras/sys-profesores.json'
  )

  constructor(data: any) {
    this.id = data.id
    this.nombre = data.nombre
    this.apellido = data.apellido
    this.email = data.email
    this.fechaAlta = data.fechaAlta
    this.isActive = data.isActive
  }

  public getId(): number {
    return this.id
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

  public static async saveAll(profesores: any[]): Promise<boolean> {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(profesores, null, 4),
        'utf8'
      )
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
