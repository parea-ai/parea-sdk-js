export enum Role {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
  example_user = 'example_user',
  example_assistant = 'example_assistant',
  function = 'function',
}

export type Message = {
  content: string;
  role: Role | string;
};

export type ResponseFormat = {
  type: 'text' | 'json_object';
};

export type ModelParams = {
  temp?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_length?: number;
  response_format?: ResponseFormat | null;
};

export type LLMInputs = {
  model?: string;
  provider?: string;
  model_params?: ModelParams;
  messages?: Message[];
  functions?: any[];
  function_call?: string | { [key: string]: string };
};

export type Completion = {
  inference_id?: string;
  parent_trace_id?: string;
  root_trace_id?: string;
  trace_name?: string;
  llm_inputs?: { [key: string]: any };
  llm_configuration?: LLMInputs;
  end_user_identifier?: string;
  deployment_id?: string;
  name?: string;
  metadata?: { [key: string]: any };
  tags?: string[];
  target?: string;
  cache?: boolean;
  log_omit_inputs?: boolean;
  log_omit_outputs?: boolean;
  log_omit?: boolean;
  experiment_uuid?: string | null;
};

export type CompletionResponse = {
  inference_id: string;
  content: string;
  latency: number;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cost: number;
  model: string;
  provider: string;
  cache_hit: boolean;
  status: string;
  start_timestamp: string;
  end_timestamp: string;
  error?: string;
  trace_id?: string;
};

export type UseDeployedPrompt = {
  deployment_id: string;
  llm_inputs?: { [key: string]: any };
};

export type Prompt = {
  raw_messages: { [key: string]: any }[];
  messages: { [key: string]: any }[];
  inputs?: { [key: string]: any };
};

export type UseDeployedPromptResponse = {
  deployment_id: string;
  name?: string;
  functions?: { [key: string]: any };
  function_call?: string;
  prompt?: Prompt;
  model?: string;
  provider?: string;
  model_params?: { [key: string]: any };
};

export type FeedbackRequest = {
  score: number;
  trace_id?: string;
  inference_id?: string;
  name?: string;
  target?: string;
  comment?: string;
};

export type TraceLogInputs = {
  [key: string]: string;
};

export type NamedEvaluationScore = {
  name: string;
  score: number;
};

export type Log = {
  configuration?: LLMInputs;
  inputs?: TraceLogInputs;
  output?: string;
  target?: string;
  latency?: number;
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  cost?: number;
};

export type TraceLog = Log & {
  trace_id: string;
  parent_trace_id?: string;
  root_trace_id?: string;
  start_timestamp: string;
  organization_id?: string;
  error?: string;
  status?: string;
  deployment_id?: string;
  output_for_eval_metrics?: string;
  cache_hit?: boolean;
  evaluation_metric_names?: string[];
  scores?: NamedEvaluationScore[];
  feedback_score?: number;
  trace_name?: string;
  children: string[];
  end_timestamp?: string;
  end_user_identifier?: string;
  metadata?: { [key: string]: any };
  tags?: string[];
  experiment_uuid?: string | null;
};

export type TraceLogTreeSchema = TraceLog & {
  children_logs: TraceLogTreeSchema[];
};

export type TraceOptions = {
  metadata?: any;
  endUserIdentifier?: string;
  tags?: string[];
  target?: string;
  evalFuncNames?: string[];
  evalFuncs?: any[];
  accessOutputOfFunc?: (arg0: any) => string;
};

export type UpdateLog = {
  trace_id: string;
  field_name_to_value_map: { [key: string]: any };
};

export type CreateExperimentRequest = {
  name: string;
};

export type ExperimentSchema = CreateExperimentRequest & {
  uuid: string;
  created_at: string;
};

export type EvaluationScoreSchema = NamedEvaluationScore & {
  id?: number;
};

export type TraceStatsSchema = {
  trace_id: string;
  latency?: number;
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  cost?: number;
  scores?: EvaluationScoreSchema[];
};

export type DataItem = {
  [key: string]: any;
};

export class ExperimentStatsSchema {
  parent_trace_stats: TraceStatsSchema[];

  constructor(parent_trace_stats: TraceStatsSchema[]) {
    this.parent_trace_stats = parent_trace_stats;
  }

  cumulativeAvgScore(): number {
    const scores = this.parent_trace_stats.flatMap((traceStat) => traceStat.scores?.map((score) => score.score) || []);
    return scores.length > 0 ? scores.reduce((acc, curr) => acc + curr, 0) / scores.length : 0.0;
  }

  avgScore(scoreName: string): number {
    const scores = this.parent_trace_stats.flatMap(
      (traceStat) => traceStat.scores?.filter((score) => score.name === scoreName).map((score) => score.score) || [],
    );
    return scores.length > 0 ? scores.reduce((acc, curr) => acc + curr, 0) / scores.length : 0.0;
  }
}

export interface CreateGetProjectSchema {
  name: string;
}

export type ProjectSchema = CreateGetProjectSchema & {
  uuid: string;
  createdAt: string;
};

export type KVMap = Record<string, any>;

export interface LangchainRunUpdate {
  end_time?: number;
  extra?: KVMap;
  error?: string;
  inputs?: KVMap;
  outputs?: KVMap;
  parent_run_id?: string;
  reference_example_id?: string;
  events?: KVMap[];
  session_id?: string;
}

export interface LangchainBaseRun {
  /** Optionally, a unique identifier for the run. */
  id?: string;
  /** A human-readable name for the run. */
  name: string;
  /** Defines the sequence in which the run was executed. */
  execution_order?: number;
  /** The epoch time at which the run started, if available. */
  start_time?: number;
  /** Specifies the type of run (tool, chain, llm, etc.). */
  run_type: string;
  /** The epoch time at which the run ended, if applicable. */
  end_time?: number;
  /** Any additional metadata or settings for the run. */
  extra?: KVMap;
  /** Error message, captured if the run faces any issues. */
  error?: string;
  /** Serialized state of the run for potential future use. */
  serialized?: object;
  /** Events like 'start', 'end' linked to the run. */
  events?: KVMap[];
  /** Inputs that were used to initiate the run. */
  inputs: KVMap;
  /** Outputs produced by the run, if any. */
  outputs?: KVMap;
  /** ID of an example that might be related to this run. */
  reference_example_id?: string;
  /** ID of a parent run, if this run is part of a larger operation. */
  parent_run_id?: string;
  /** Tags for further categorizing or annotating the run. */
  tags?: string[];
}

export interface LangchainRunCreate extends LangchainBaseRun {
  child_runs?: this[];
  session_name?: string;
}

export enum TraceIntegrations {
  LANGCHAIN = 'langchain',
}
