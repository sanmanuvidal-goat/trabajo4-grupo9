import { PersonaModel } from "./persona.model"

export class AlumnoModel extends PersonaModel {

  private legajo: number
  private fechaAlta: string
  private modificacion: string
  private isActive: boolean

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

}