import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { logger } from "../src/helper/logger";
import { ScamScoreAnalysis } from "../src/model/scam-score-analysis.model";
import { publicConfig } from "./public.config";

export const connect = () => {

    const { host, dialect, db, dbUser, dbPassword } = publicConfig;
    const operatorsAliases: any = false;
    logger.info(`${dialect}://${dbUser}:${dbPassword}@${host}/${db}`);
    const sequelize = new Sequelize(`${dialect}://${dbUser}:${dbPassword}@${host}/${db}`, {operatorsAliases, repositoryMode: true});

    sequelize.addModels([ScamScoreAnalysis]);

    return sequelize;
}