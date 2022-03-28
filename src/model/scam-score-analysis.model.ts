import { Table, Column, Model, DataType} from "sequelize-typescript";

@Table
export class ScamScoreAnalysis extends Model {

    @Column(DataType.STRING)
    url!: string;

    @Column(DataType.STRING)
    urlId!: string;

    @Column(DataType.INTEGER)
    harmless!: number;
    
    @Column(DataType.INTEGER)
    malicious!: number;

    @Column(DataType.INTEGER)
    suspicious!: number;

    @Column(DataType.INTEGER)
    undetected!: number;

    @Column(DataType.INTEGER)
    timeout!: number;

    @Column(DataType.INTEGER)
    totalResults!: number;

    @Column(DataType.INTEGER)
    scamScore!: number;

    @Column(DataType.DATE)
    lastAnalysisDate!: Date;
}