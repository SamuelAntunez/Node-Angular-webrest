import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AdminSeed } from './data/seed/admin.seed';
import { BcryptHashService, JwtTokenService, MongoUserDatasource, UserRepositoryImpl } from './infrastructure';
import { PostgresUserDatasource } from './infrastructure/datasource/postgres/postgres-user.datasrouce';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async () => {
  main();
})();


async function main() {

  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })
  // User Repository
  const mongoRepository = new MongoUserDatasource()
  const postgresRepository = new PostgresUserDatasource()
  // Services
  const repository = new UserRepositoryImpl(postgresRepository)
  const hashService = new BcryptHashService();
  const tokenService = new JwtTokenService();

  await AdminSeed.run(repository, hashService, tokenService)

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}