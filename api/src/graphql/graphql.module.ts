import {Module} from '@nestjs/common';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import {GraphqlController} from './graphql.controller';
import {GraphqlSchemaFactory} from './schema/graphql-schema-factory.component';
import {typeDefsProvider} from './schema/typeDefs.provider';
import {EnsureAuthenticatedMiddleware} from '../api/middleware/ensure-authenticated.middleware';
import {PersistenceModule} from '../persistence/persistence.module';
import {DefinitionConfigMapper} from './resolver/definition-config-mapper.component';
import {ProjectsResolverFactory} from './resolver/projects-resolver-factory.component';
import {DefinitionResolverFactory} from './resolver/definition-resolver-factory.component';
import {InstanceResolverFactory} from './resolver/instance-resolver-factory.component';
import {UsersResolverFactory} from './resolver/users-resolver-factory.component';
import {InstantiationModule} from '../instantiation/instantiation.module';
import {ResolverPaginationArgumentsHelper} from './resolver/pagination-argument/resolver-pagination-arguments-helper.component';
import {DateResolverFactory} from './resolver/date-resolver-factory.component';
import {PublicSshKeyResolverFactory} from './resolver/public-ssh-key-resolver-factory.component';
import {ConfigModule} from '../config/config.module';
import {LogsResolverFactory} from './resolver/logs-resolver-factory.component';

@Module({
    imports: [
        PersistenceModule,
        InstantiationModule,
        ConfigModule,
    ],
    controllers: [
        GraphqlController,
    ],
    components: [
        DefinitionConfigMapper,
        GraphqlSchemaFactory,
        PublicSshKeyResolverFactory,
        UsersResolverFactory,
        LogsResolverFactory,
        ProjectsResolverFactory,
        DefinitionResolverFactory,
        InstanceResolverFactory,
        DateResolverFactory,
        ResolverPaginationArgumentsHelper,
        typeDefsProvider,
    ],
})
export class GraphqlModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(EnsureAuthenticatedMiddleware).forRoutes(GraphqlController);
    }
}
