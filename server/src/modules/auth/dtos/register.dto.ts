import { z } from "zod";
import { ZodDtoValidatorException } from '../../../utils/error/custom.errors'

export class RegisterDTO {
  password!: string;
  email!: string;
  name!: string;

  private static schema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
  });

  /**
   * Validate according to the zod validation scheme
   * @param data Object to be validated
   * @param hideErros Hide validation errors in the request response body
   */
  static validate(data: z.infer<typeof this.schema>, hideErros?: boolean) {
    const validation = this.schema.safeParse(data);

    if (!validation.success) {
      throw new ZodDtoValidatorException(
        validation.error.formErrors.fieldErrors,
        hideErros
      );
    }

    return new this(validation.data);
  }

  constructor(data: z.infer<typeof RegisterDTO.schema>) {
    Object.assign(this, data);
  }

}