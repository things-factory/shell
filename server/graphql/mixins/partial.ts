import { ClassType, InputType, ObjectType } from 'type-graphql';

export default function Partial<TClassType extends ClassType>(
  BaseClass: TClassType,
) {
  const metadata = (global as any).TypeGraphQLMetadataStorage;

  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class PartialClass extends BaseClass {}

  // Copy relevant fields and create a nullable version on the new type
  const fields = metadata.fields.filter(
    f => f.target === BaseClass || BaseClass.prototype instanceof f.target,
  );
  fields.forEach(field => {
    const newField = {
      ...field,
      typeOptions: { ...field.typeOptions, nullable: true },
      target: PartialClass,
    };
    metadata.fields.push(newField);
  });

  return PartialClass;
}
