import AjvModule from 'ajv';
// Ajv v8 ESM import compatibility
const Ajv = (AjvModule as any).default || AjvModule;
import { ValidateFunction } from 'ajv';

export class Validator {
  private ajv = new Ajv();
  compile(schema: object): ValidateFunction {
    return this.ajv.compile(schema);
  }
}