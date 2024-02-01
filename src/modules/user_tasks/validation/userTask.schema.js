import Joi from "joi";

export const UserTaskSchema = Joi.object({
	userId: Joi.number().required(),
	taskId: Joi.number().required(),
	startAt: Joi.date().required(),
	endAt: Joi.date().required(),
	startedDate: Joi.date(),
	endedDate: Joi.date(),
	status: Joi.string(),
	day: Joi.number().required(),
})
