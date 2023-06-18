import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
	const uri =
		'mongodb+srv://nodelearnmvc:' +
		configService.get<string>('MONGO_PASS') +
		'@' +
		configService.get<string>('MONGO_CLUSTER') +
		'/' +
		configService.get<string>('MONGO_DBNAME');
	+'?retryWrites=true&w=majority';
	return {
		uri,
	};
};
