import { IsNotEmpty } from 'class-validator';

class CreateTaskDto {
  @IsNotEmpty({ message: 'توضیحات نباید خالی باشد' })
  description: string;

  @IsNotEmpty() title: string;
}

export { CreateTaskDto };
