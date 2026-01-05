import { WeekPlan, Capstone } from './types';

const SAMPLE_RESOURCES = [
  { title: "DeepMind RL Lecture Series", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlE6umKx0cOid" },
  { title: "JAX Documentation: The Sharp Bits", url: "https://jax.readthedocs.io/en/latest/notebooks/Common_Gotchas_in_JAX.html" },
  { title: "Spinning Up in Deep RL (OpenAI)", url: "https://spinningup.openai.com/en/latest/" }
];


export const ROADMAP: WeekPlan[] = [
  {
    week: 1,
    title: "Bandits + Experimental RL Mindset",
    goal: "Understand exploration/exploitation, regret minimization, and build a solid experimental harness.",
    theory: ["Sutton & Barto Ch. 1–2"],
    papers: {
      must: [
        { title: "Finite-time Analysis of the Multiarmed Bandit Problem", authors: "Auer et al.", year: 2002 },
        { title: "A Tutorial on Thompson Sampling", authors: "Russo et al.", year: 2017 }
      ],
      optional: [
        { title: "Regret Analysis of Stochastic and Nonstochastic Multi-armed Bandit Problems", authors: "Bubeck & Cesa-Bianchi", year: 2012 },
        { title: "Thompson Sampling for Contextual Bandits with Linear Payoffs", authors: "Agrawal & Goyal", year: 2012 }
      ]
    },
    implementation: [
      "Bandit suite: ε-greedy, UCB1, Thompson Sampling",
      "Optimistic initialization vs explicit exploration bonuses",
      "Non-stationary bandits: drifting means and abrupt change points",
      "Compare sliding-window UCB vs discounted Thompson Sampling",
      "Multiple seeds + confidence intervals over regret",
      "Plot regret vs steps; sensitivity to hyperparameters",
      "Build standard experiment harness: logging, metrics, seeds, config saving"
    ],
    jaxFocus: [
      "JAX basics: arrays, jit, grad, vmap + sharp-bits mental model",
      "Trace → compile → execute: what runs once vs every step",
      "Vectorized simulations with vmap (many bandits, many seeds)"
    ],
    controlQuestions: [
      "What is regret and why is it the right objective for bandits?",
      "Why does ε-greedy converge slowly compared to UCB-style methods?",
      "Derive the UCB bonus term: what intuition does it encode?",
      "What does Thompson Sampling sample, and why does that induce exploration?",
      "What changes when rewards are non-stationary?",
      "Why are bandits not just MDPs with one state — what intuition is lost?",
      "In what sense are bandits an online statistical estimation problem?",
      "In JAX: what does a pure function mean, and why does jit care?"
    ],
    resources: [
      {
        title: "Sutton & Barto — Reinforcement Learning: An Introduction (2nd ed.)",
        url: "http://incompleteideas.net/book/the-book-2nd.html"
      },
      {
        title: "Bandit Algorithms (Lattimore & Szepesvári)",
        url: "https://tor-lattimore.com/downloads/book/book.pdf"
      },
      {
        title: "DeepMind RL Lecture Series",
        url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlE6umKx0cOid"
      },
      {
        title: "JAX Documentation: The Sharp Bits",
        url: "https://jax.readthedocs.io/en/latest/notebooks/Common_Gotchas_in_JAX.html"
      }
    ]
  },
  {
    week: 2,
    title: "MDPs + Dynamic Programming",
    goal: "Understand value functions, policies, and exact planning in known MDPs.",
    theory: ["Sutton & Barto Ch. 3–4"],
    papers: {
      must: [{ title: "A Markovian Decision Process", authors: "Bellman", year: 1957 }],
      optional: [{ title: "Dynamic Programming and Markov Processes", authors: "Howard", year: 1960 }]
    },
    implementation: [
      "Tabular MDP class with explicit dynamics (P, R)",
      "Synchronous vs asynchronous Bellman updates",
      "Policy evaluation (V^π and Q^π)",
      "Policy iteration and value iteration",
      "Track policy stability across iterations",
      "Extract greedy policies from V and Q (π_V vs π_Q)",
      "Validate on Gridworld and Gambler’s Problem"
    ],
    jaxFocus: [
      "Bellman backups with vmap",
      "Static shapes and pure functions",
      "Why DP is embarrassingly parallel (and why learning is not)",
      "Prepare for replacing Python loops with lax.scan"
    ],
    controlQuestions: [
      "What is the difference between policy evaluation and control?",
      "Write the Bellman expectation equations for V^π and Q^π.",
      "Why is the Bellman optimality operator a contraction for γ < 1?",
      "When does policy iteration outperform value iteration?",
      "What breaks when γ = 1 in continuing tasks?",
      "Why is Dynamic Programming rarely used directly in real problems?",
      "What assumptions about the environment does DP rely on?",
      "In JAX: why does Python control flow often need rewriting?"
    ],
    resources: [
      {
        title: "Sutton & Barto — Reinforcement Learning: An Introduction (2nd ed.)",
        url: "http://incompleteideas.net/book/the-book-2nd.html"
      },
      {
        title: "David Silver — Reinforcement Learning Course",
        url: "https://www.davidsilver.uk/teaching/"
      },
      {
        title: "DeepMind RL Lecture Series",
        url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlE6umKx0cOid"
      },
      {
        title: "JAX Documentation: Control Flow",
        url: "https://jax.readthedocs.io/en/latest/control-flow.html"
      }
    ]
  },
  {
    week: 3,
    title: "Monte Carlo vs Temporal-Difference Learning",
    goal: "Understand bias–variance tradeoffs and the role of bootstrapping.",
    theory: ["Sutton & Barto Ch. 5–6"],
    papers: {
      must: [
        { title: "Learning to Predict by the Methods of Temporal Differences", authors: "Sutton", year: 1988 },
        { title: "Q-learning", authors: "Watkins & Dayan", year: 1992 }
      ],
      optional: []
    },
    implementation: [
      "Monte Carlo prediction and MC control (ε-soft)",
      "Online vs episodic learning comparison",
      "TD(0), n-step TD (n = 2, 4, ∞)",
      "SARSA, Expected SARSA, Q-learning",
      "Constant vs decaying step-size schedules",
      "Demonstrate instability or divergence with poor hyperparameters",
      "Evaluate on CliffWalking and Blackjack"
    ],
    jaxFocus: [
      "TD updates as pure JAX functions",
      "Explicit environment state (no hidden mutation)",
      "PRNG key splitting for ε-greedy and sampling",
      "Scan-based episode rollouts (preview of trajectory batching)"
    ],
    controlQuestions: [
      "MC vs TD: which has higher bias, which has higher variance, and why?",
      "What is the TD error δ and what does it estimate?",
      "How do n-step methods unify MC and TD?",
      "SARSA vs Q-learning: what changes in on-policy vs off-policy updates?",
      "Why does Q-learning require sufficient exploration for convergence?",
      "When is Expected SARSA preferable?",
      "Why can TD methods learn online while MC methods cannot?",
      "Why does bootstrapping introduce bias, and why is that sometimes beneficial?",
      "In JAX: how do you handle randomness without global RNG state?"
    ],
    resources: [
      {
        title: "Sutton & Barto — Reinforcement Learning: An Introduction (2nd ed.)",
        url: "http://incompleteideas.net/book/the-book-2nd.html"
      },
      {
        title: "David Silver — Reinforcement Learning Course",
        url: "https://www.davidsilver.uk/teaching/"
      },
      {
        title: "Spinning Up in Deep RL (OpenAI)",
        url: "https://spinningup.openai.com/en/latest/"
      },
      {
        title: "JAX PRNG Design",
        url: "https://jax.readthedocs.io/en/latest/random-numbers.html"
      }
    ]
  },
  {
    week: 4,
    title: "n‑step methods + Eligibility Traces + Approximation pitfalls",
    goal: "Connect forward view ↔ backward view, and learn why approximation can diverge.",
    theory: ["Sutton & Barto Ch. 7 + Ch. 12 (eligibility traces)"],
    papers: {
      must: [
        { title: "An Analysis of Temporal-Difference Learning with Function Approximation", authors: "Tsitsiklis & Van Roy", year: 1997 },
        { title: "True Online TD(λ)", authors: "van Seijen & Sutton", year: 2014 }
      ],
      optional: [
        { title: "Residual Algorithms: Reinforcement Learning with Function Approximation", authors: "Baird", year: 1995 },
        { title: "Incremental multi-step Q-learning", authors: "Peng & Williams", year: 1996 }
      ]
    },
    implementation: [
      "n‑step TD prediction",
      "SARSA(λ) and/or Watkins’s Q(λ)",
      "Linear function approximation (tile coding) on MountainCar"
    ],
    jaxFocus: [
      "Learn lax.scan properly (rollouts, eligibility traces)",
      "Learn PyTrees (params/state containers)"
    ],
    controlQuestions: [
      "Define the n‑step return (G_t^{(n)}).",
      "How does λ interpolate between MC and TD?",
      "Forward view vs backward view: when are they equivalent?",
      "Why can off-policy TD with function approximation diverge?",
      "What does “true online” fix conceptually?",
      "In JAX: when does jit force you to rethink data structures?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 5,
    title: "Planning + Model-based RL (tabular): Dyna",
    goal: "Learn the classic “learn a model + plan with it” loop.",
    theory: ["Sutton & Barto Ch. 8"],
    papers: {
      must: [{ title: "Integrated Architectures for Learning, Planning, and Reacting…", authors: "Sutton", year: 1990 }],
      optional: [{ title: "PILCO: A Model-Based and Data-Efficient Approach to Policy Search", authors: "Deisenroth & Rasmussen", year: 2011 }]
    },
    implementation: [
      "Dyna‑Q in Gridworld (learn transition model + planning updates)",
      "Compare: pure Q-learning vs Dyna-Q at equal environment steps",
      "Stretch: prioritized sweeping"
    ],
    jaxFocus: [
      "RNG keys + “stateful computations” (must internalize for RL)"
    ],
    controlQuestions: [
      "What’s the difference between model learning and planning in Dyna?",
      "When does planning help the most (and least)?",
      "Why can an inaccurate model harm control?",
      "What is prioritized sweeping trying to approximate?",
      "How do you evaluate sample efficiency fairly (env steps vs compute)?",
      "In JAX: what’s the correct mental model for splitting RNG keys?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 6,
    title: "Policy Gradients: REINFORCE + baselines",
    goal: "Get the policy gradient theorem + implement REINFORCE correctly.",
    theory: ["Sutton & Barto Ch. 13 (policy gradient sections)"],
    papers: {
      must: [
        { title: "Simple statistical gradient-following algorithms for connectionist RL", authors: "Williams", year: 1992 },
        { title: "Policy Gradient Methods for RL with Function Approximation", authors: "Sutton et al.", year: 1999 }
      ],
      optional: [{ title: "Deterministic Policy Gradient Algorithms", authors: "Silver et al.", year: 2014 }]
    },
    implementation: [
      "REINFORCE on CartPole",
      "Add baseline (value function) and show variance reduction",
      "Add reward-to-go, advantage normalization"
    ],
    jaxFocus: [
      "Flax + Optax basics (simple MLP + train step)",
      "Port REINFORCE to JAX (even if env stepping remains in Python)"
    ],
    controlQuestions: [
      "Derive REINFORCE from (∇_θ E[G]).",
      "Why does subtracting a baseline not change the expected gradient?",
      "What baseline is optimal (in theory) for variance reduction?",
      "Why do we use advantage estimates rather than raw returns?",
      "What are common failure modes (entropy collapse, exploding gradients)?",
      "In JAX: why do you typically return (loss, aux) and keep state explicit?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 7,
    title: "Actor-Critic + GAE + Trust regions (theory)",
    goal: "Advantage estimation and stable actor-critic training.",
    theory: ["Sutton & Barto Ch. 13 (actor-critic)"],
    papers: {
      must: [
        { title: "Generalized Advantage Estimation", authors: "Schulman et al.", year: 2015 },
        { title: "Trust Region Policy Optimization", authors: "Schulman et al.", year: 2015 }
      ],
      optional: [{ title: "Asynchronous Methods for Deep RL (A3C)", authors: "Mnih et al.", year: 2016 }]
    },
    implementation: [
      "A2C (synchronous advantage actor-critic) + GAE",
      "Run on CartPole + LunarLander (or a simple continuous task)"
    ],
    jaxFocus: [
      "Rollout collection with lax.scan (even if env is vectorized outside)",
      "Build a reusable TrainState pattern (params + opt state)"
    ],
    controlQuestions: [
      "What is the advantage function (A^π(s,a)) and why is it useful?",
      "Explain the bias/variance tradeoff controlled by GAE λ.",
      "Why does TRPO use a KL constraint?",
      "Why is the Fisher information matrix relevant in TRPO?",
      "A2C vs A3C: what problem does async solve?",
      "In JAX: what part of PPO/A2C is easiest to jit and what part is hardest?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 8,
    title: "PPO (your on‑policy baseline) + evaluation discipline",
    goal: "Implement PPO cleanly and learn “research-grade evaluation habits.”",
    theory: ["Sutton & Barto Ch. 13; skim Ch. 9–11"],
    papers: {
      must: [
        { title: "Proximal Policy Optimization Algorithms", authors: "Schulman et al.", year: 2017 },
        { title: "Deep RL that Matters", authors: "Henderson et al.", year: 2018 }
      ],
      optional: [{ title: "On the Importance of Hyperparameters and Random Seeds in RL", authors: "Chan et al.", year: 2020 }]
    },
    implementation: [
      "PPO (clip objective + value loss + entropy bonus)",
      "Vectorized environments (Gymnasium AsyncVectorEnv)",
      "Reproduce a known curve (e.g., HalfCheetah or LunarLander) matching CleanRL"
    ],
    jaxFocus: [
      "Full PPO in JAX (this is your first major milestone)",
      "Use vmap to handle batch of agents (parallel envs) purely in JAX if possible (e.g. Brax/Gymnax) OR just batch updates"
    ],
    controlQuestions: [
      "Why does PPO clip the ratio r(θ)?",
      "How does PPO differ from TRPO in implementation complexity?",
      "Why is normalization (obs, rewards, advantages) critical in Deep RL?",
      "What constitutes a “fair” comparison between algorithms?",
      "In JAX: how do you handle the “minibatch update” loop inside the “epoch” loop efficiently?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 9,
    title: "DQN family (Value-based Deep RL)",
    goal: "Master off-policy learning and instability fixes.",
    theory: ["Sutton & Barto Ch. 11 (off-policy approx)"],
    papers: {
      must: [
        { title: "Human-level control through deep reinforcement learning", authors: "Mnih et al.", year: 2015 },
        { title: "Deep Reinforcement Learning with Double Q-learning", authors: "Van Hasselt et al.", year: 2016 }
      ],
      optional: [{ title: "Prioritized Experience Replay", authors: "Schaul et al.", year: 2015 }]
    },
    implementation: [
      "DQN + Target Network + Replay Buffer",
      "Double DQN",
      "Train on Atari (Pong/Breakout) or MinAtar (faster)"
    ],
    jaxFocus: [
      "Efficient Replay Buffer (pre-allocate arrays)",
      "Using Optax for target network updates (polyak averaging)"
    ],
    controlQuestions: [
      "Why is a target network needed in DQN?",
      "What is the “deadly triad”?",
      "How does Double DQN fix maximization bias?",
      "Why is off-policy learning harder to stabilize than on-policy?",
      "In JAX: how do you manage a large replay buffer without OOM?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 10,
    title: "Continuous Control: DDPG → TD3",
    goal: "Extend Q-learning to continuous actions.",
    theory: ["(Review policy gradient theorem)"],
    papers: {
      must: [
        { title: "Continuous control with deep reinforcement learning", authors: "Lillicrap et al.", year: 2015 },
        { title: "Addressing Function Approximation Error in Actor-Critic Methods", authors: "Fujimoto et al.", year: 2018 }
      ],
      optional: []
    },
    implementation: [
      "DDPG (and fail to train it stably)",
      "TD3 (Target Policy Smoothing + Clipped Double Q)",
      "Train on MuJoCo/PyBullet (Hopper/Walker2d)"
    ],
    jaxFocus: [
      "Handling multiple networks (Actor, Critic 1, Critic 2, Targets)",
      "Using `jax.random.normal` for exploration noise and smoothing noise"
    ],
    controlQuestions: [
      "Why can’t we just use DQN for continuous actions?",
      "What 3 tricks make TD3 stable compared to DDPG?",
      "Why do we add noise to the target policy actions?",
      "In JAX: how do you update multiple optimizers in one step?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 11,
    title: "Maximum Entropy RL: SAC",
    goal: "Implement the modern standard for continuous control.",
    theory: ["(Entropy regularization)"],
    papers: {
      must: [
        { title: "Soft Actor-Critic: Off-Policy Maximum Entropy Deep RL", authors: "Haarnoja et al.", year: 2018 },
        { title: "Soft Actor-Critic Algorithms and Applications", authors: "Haarnoja et al.", year: 2019 }
      ],
      optional: []
    },
    implementation: [
      "SAC (with auto-tuned alpha)",
      "Compare SAC vs TD3 on a hard env (Humanoid or Ant)"
    ],
    jaxFocus: [
      "Reparameterization trick (sampling with gradients) in JAX (`jax.random.normal` + transform)",
      "Log-prob calculation for squashed Gaussians (tanh)"
    ],
    controlQuestions: [
      "What is the max-entropy objective?",
      "How does entropy help exploration?",
      "Why do we need the reparameterization trick?",
      "What is the difference between SAC v1 (value net) and v2 (no value net)?",
      "In JAX: how do you implement the TanhNormal distribution numerically stably?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 12,
    title: "Model-Based RL (Deep): World Models / MBPO",
    goal: "Learn dynamics models in latent or observation space.",
    theory: ["(Review Dyna)"],
    papers: {
      must: [
        { title: "When to Trust Your Model: Model-Based Policy Optimization", authors: "Janner et al.", year: 2019 },
        { title: "World Models", authors: "Ha & Schmidhuber.", year: 2018 }
      ],
      optional: [{ title: "DreamerV3 (skim)", authors: "Hafner et al.", year: 2023 }]
    },
    implementation: [
      "Train a probabilistic ensemble of dynamics models (Gaussian MLP)",
      "Use it to generate synthetic data for SAC (MBPO style - simplified)"
    ],
    jaxFocus: [
      "Ensembles in JAX are trivial: `vmap` over the model parameters!",
      "This is where JAX shines (massive parallel simulation)"
    ],
    controlQuestions: [
      "Why use an ensemble of models?",
      "What is the difference between background planning (Dyna) and shooting methods (MPC)?",
      "Why does MBPO truncate model rollouts?",
      "In JAX: how does `vmap` change how you initialize your model ensemble?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 13,
    title: "Offline RL (The new frontier)",
    goal: "Understand distribution shift and conservatism.",
    theory: ["(Batch RL basics)"],
    papers: {
      must: [
        { title: "Conservative Q-Learning for Offline Reinforcement Learning", authors: "Kumar et al.", year: 2020 },
        { title: "Offline Reinforcement Learning: Tutorial, Review, and Perspectives", authors: "Levine et al.", year: 2020 }
      ],
      optional: [{ title: "IQL: Implicit Q-Learning", authors: "Kostrikov et al.", year: 2021 }]
    },
    implementation: [
      "Load a D4RL dataset",
      "Run standard SAC (watch it fail)",
      "Implement CQL (add the conservative loss term)"
    ],
    jaxFocus: [
      "Efficient data loading/batching in JAX",
      "LogSumExp tricks for CQL loss stability"
    ],
    controlQuestions: [
      "Why does standard Q-learning fail on offline data?",
      "What is OOD (Out-of-Distribution) action?",
      "How does CQL penalize OOD actions?",
      "In JAX: how do you compute log-sum-exp efficiently?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 14,
    title: "Multi-Agent RL (MARL)",
    goal: "Understand centralized training, decentralized execution (CTDE).",
    theory: ["(Game theory basics: Nash, Pareto)"],
    papers: {
      must: [
        { title: "Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments", authors: "Lowe et al.", year: 2017 },
        { title: "QMIX: Monotonic Value Function Factorisation", authors: "Rashid et al.", year: 2018 }
      ],
      optional: []
    },
    implementation: [
      "MADDPG on Simple Tag (MPE)",
      "OR QMIX on SMAC (StarCraft) - if compute allows (or use a simplified grid MARL)"
    ],
    jaxFocus: [
      "Batching across agents vs batching across time",
      "vmap over agents"
    ],
    controlQuestions: [
      "What is the credit assignment problem in MARL?",
      "Why is independent Q-learning (IQL) unstable?",
      "What is CTDE?",
      "How does QMIX enforce monotonicity?",
      "In JAX: how do you handle variable numbers of agents (masking)?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 15,
    title: "Meta-RL / Generalization",
    goal: "Learn to learn.",
    theory: ["(Bayesian RL context)"],
    papers: {
      must: [
        { title: "Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks", authors: "Finn et al.", year: 2017 },
        { title: "RL^2: Fast Reinforcement Learning via Slow Reinforcement Learning", authors: "Duan et al.", year: 2016 }
      ],
      optional: []
    },
    implementation: [
      "MAML for RL (hard!) OR RL^2 (LSTM based agent)",
      "Test on distribution of bandit tasks or navigation tasks"
    ],
    jaxFocus: [
      "Higher-order gradients (MAML needs gradient through gradient)",
      "JAX handles this naturally (`grad(grad(...))`), PyTorch is messier"
    ],
    controlQuestions: [
      "What is the difference between meta-learning and standard transfer?",
      "How does RL^2 implement an algorithm inside an RNN?",
      "Why is MAML hard to train?",
      "In JAX: how does `jax.grad` handle higher-order derivatives?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 16,
    title: "Capstone Prep + Advanced Topics (Transformer RL)",
    goal: "Catch up on the Decision Transformer hype.",
    theory: ["(Sequence modeling)"],
    papers: {
      must: [{ title: "Decision Transformer: Reinforcement Learning via Sequence Modeling", authors: "Chen et al.", year: 2021 }],
      optional: [{ title: "Reinforcement Learning with Human Feedback (InstructGPT)", authors: "Ouyang et al.", year: 2022 }]
    },
    implementation: [
      "Decision Transformer on a simple gym env",
      "OR: Start your Capstone project full time"
    ],
    jaxFocus: [
      "Flax Linen attention layers",
      "Transformer training loop in JAX"
    ],
    controlQuestions: [
      "Is Decision Transformer doing RL or Imitation Learning?",
      "What is the context length trade-off?",
      "How does RLHF relate to PPO?",
      "In JAX: how do you implement causal masking efficiently?"
    ],
    resources: SAMPLE_RESOURCES
  },
  {
    week: 17,
    title: "Scaling RL + frameworks/benchmarks + capstone finish",
    goal: "Understand scalable architectures and finish a portfolio-quality capstone.",
    theory: ["(Distributed systems)"],
    papers: {
      must: [
        { title: "IMPALA: Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures", authors: "Espeholt et al.", year: 2018 },
        { title: "Distributed Prioritized Experience Replay (Ape-X)", authors: "Horgan et al.", year: 2018 }
      ],
      optional: [{ title: "Acme: A Research Framework for Distributed RL", authors: "Hoffman et al.", year: 2020 }]
    },
    implementation: [
      "Finish Capstone",
      "Write report",
      "Polish code"
    ],
    jaxFocus: [
      "Performance profiling",
      "Multi-device training (`pmap`)"
    ],
    controlQuestions: [
      "What problem does actor-learner separation solve?",
      "What is V-trace?",
      "How does Ape-X scale?",
      "In JAX: what are your top performance bottlenecks?"
    ],
    resources: SAMPLE_RESOURCES
  }
];

export const CAPSTONES: Capstone[] = [
  {
    id: "A",
    title: "Value-based (Discrete control, “Rainbow-lite” research)",
    track: "Value-based",
    hypothesis: "Quantify which components of Rainbow matter most under controlled evaluation.",
    baselines: ["DQN", "Double DQN", "Dueling DQN", "PER"],
    env: "bsuite (fast, diagnostic tasks)",
    jaxAngle: "Implement full agent in JAX (Flax + Optax) and use jit for the update step."
  },
  {
    id: "B",
    title: "Policy-based (PPO + exploration/generalization)",
    track: "Policy-based",
    hypothesis: "Study exploration bonuses and generalization in PPO.",
    baselines: ["PPO + GAE", "PPO + RND", "PPO + ICM"],
    env: "Sparse-reward tasks + generalization tasks (Procgen or bsuite)",
    jaxAngle: "PPO is a JAX showcase; vectorize rollouts and jit the update."
  },
  {
    id: "C",
    title: "Model-based + Offline hybrid",
    track: "Model-based / Offline",
    hypothesis: "Use short synthetic rollouts to improve offline performance.",
    baselines: ["CQL", "IQL", "MBPO-style augmentation"],
    env: "D4RL",
    jaxAngle: "Dynamics ensembles are very JAX-friendly (fast batching with vmap)."
  }
];

export const STRATEGY_CONTENT = {
  daily: [
    { time: "75–90m", task: "Sutton chapter sections + 1 paper (notes + “what’s the key idea?”)" },
    { time: "120m", task: "Implement the week’s algorithm (minimal, correct, tested)" },
    { time: "30–45m", task: "Run experiments + plots + seed sanity checks" },
    { time: "10–15m", task: "Write a short log (“what worked/failed, what I learned”)" }
  ],
  weekly: [
    { days: "Days 1–5", task: "Learn + Implement" },
    { days: "Day 6", task: "Experiments, ablations, cleanup" },
    { days: "Day 7", task: "Review + write a 1‑page summary (or rest)" }
  ],
  repoRules: [
    "Keep a single codebase with a stable API: Agent, ReplayBuffer, Policy, ValueNet, Trainer.",
    "For each algorithm, ship: README.md, train.py + config, reproducible curves (≥3 seeds), unit test."
  ],
  jaxStrategy: [
    "Anchor #1: PPO in JAX (Weeks 6–8)",
    "Anchor #2: DQN or SAC in JAX (Weeks 9–13)",
    "Use JAX core docs + sharp bits",
    "Master stateful computations / RNG keys",
    "Use Flax (networks) and Optax (optimizers)",
    "Use lax.scan for rollouts"
  ]
};
