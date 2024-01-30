import { z } from "zod"
import { ZodDtoValidatorException } from "../../../utils/error/custom.errors"

export class RequestGetUserDTO {
    id!: number

    static schema = z.object({
        id: z.string()
    })

    /**
   * Validates according to the zod validation scheme and returns a new instance
   * @param data Object to be validated
   * @param hideErros Hide validation errors in the request response body
   */
  static validate(
    data: z.infer<typeof this.schema>,
    hideErros?: boolean
  ) {
    const validation = this.schema.safeParse(data);

    if (!validation.success) {
      throw new ZodDtoValidatorException(
        validation.error.formErrors.fieldErrors,
        hideErros
      );
    }

    return new this(validation.data);
  }

  constructor(
    data: z.infer<typeof RequestGetUserDTO.schema>
  ) {
    this.id = Number(data.id);
  }
}