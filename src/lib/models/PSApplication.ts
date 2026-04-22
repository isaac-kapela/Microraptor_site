import mongoose, { Schema, model, models } from 'mongoose';

const PSApplicationSchema = new Schema(
  {
    nomeCompleto:         { type: String, required: true },
    curso:                { type: String, required: true },
    email:                { type: String, required: true },
    telefone:             { type: String, required: true },
    comoConheceu:         { type: String, required: true },
    periodo:              { type: String, required: true },
    previsaoConclusao:    { type: String, required: true },
    areas:                { type: [String], required: true },
    texto:                { type: String, required: true }, // caminho do arquivo enviado
    curriculo:            { type: String, required: true },
    comprovanteMatricula: { type: String, required: true },
    historicoEscolar:     { type: String, required: true },
    status: {
      type: String,
      enum: ['pendente', 'em_analise', 'aprovado', 'reprovado'],
      default: 'pendente',
    },
  },
  { timestamps: true, collection: 'psMicro' },
);

export default models.PSApplication ?? model('PSApplication', PSApplicationSchema);
