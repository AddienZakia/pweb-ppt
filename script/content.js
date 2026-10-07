/**
 * bab 1: Feedforward Neural Networks
 * bab 2: Differential Equations
 * bab 3: Forward Problem
 * bab 4: Inverse Problem
 */

export const chapters = {
    bab_1: {
        title: "Feedforward Neural Networks",
        readingTime: "24 September 2026",
        image: "image/bab_1.png",
        codeUrl: "https://drive.google.com/drive/folders/18K15aXY-yfMAsA7r5CjSrJVL5UssksYS?usp=sharing",
        prev: null,
        next: { id: "Differential-Equations", title: "Differential Equations" }
    },
    bab_2: {
        title: "Differential Equations",
        readingTime: "24 September 2026",
        image: "image/bab_2.png",
        codeUrl: "https://drive.google.com/drive/folders/1giB0P19ZguI8yirOmMbZIHO70Pq_7zkr?usp=sharing",
        prev: { id: "Feedforward-Neural-Networks", title: "Feedforward Neural Networks" },
        next: { id: "forward-problem", title: "Forward Problem" }
    },
    bab_3: {
        title: "Physics-Informed Neural Networks (Forward Problem)",
        readingTime: "24 September 2026",
        image: "image/bab_3.png",
        codeUrl: "https://drive.google.com/drive/folders/1pef0OeYg_jfmB1TA6YVU-v-q2-RxSIid?usp=sharing",
        prev: { id: "Differential-Equations", title: "Differential Equations" },
        next: { id: "inverse-problem", title: "Inverse Problem" }
    },
    bab_4: {
        title: "Physics-Informed Neural Networks (Inverse Problem)",
        readingTime: "24 September 2026",
        image: "image/bab_4.jpg",
        codeUrl: "https://drive.google.com/drive/folders/1YXK4LGDOIZXHySQcR1KUDkgd4Wu6tBga?usp=sharing",
        prev: { id: "forward-problem", title: "Forward Problem" },
        next: null
    }
};

export const referencesItem = {
    type: "text",
    title: "References",
    content: `• Raissi, M., Perdikaris, P., & Karniadakis, G. E. (2019). Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations. Journal of Computational Physics, 378, 686-707.

• Shahab, M. L., Mukhlash, I., & Susanto, H. (2026). Do physics-informed neural networks (PINNs) need to be deep? Shallow PINNs using the Levenberg-Marquardt algorithm. arXiv preprint arXiv:2602.08515.

• Shahab, M. L., Susanto, H., & Hatzikirou, H. (2025). A finite difference method with symmetry properties for the high-dimensional Bratu equation. Applied Mathematics and Computation, 489, 129136.

• Shahab, M. L., & Susanto, H. (2024). Neural networks for bifurcation and linear stability analysis of steady states in partial differential equations. Applied Mathematics and Computation, 483, 128985.

• Burden, R. L., Faires, J. D., & Burden, A. M. Numerical Analysis.

• Chong, E. K. P., & Żak, S. H. An Introduction to Optimization.`,
    align: "left",
    img: ""
};

export const content = {
    bab_1: [
        {
            type: "text",
            title: "Composite function",
            content: `A composite function is a function formed by applying one function to the output of another function.

Let $f(x) = x^2$ and $g(x) = x + 1$, then the composite function:

$$y = (f \\circ g)(x) = f(g(x)) = (x + 1)^2$$

More compositions:

$$x \\to f_1(x) \\to f_2(f_1(x)) \\to f_3(f_2(f_1(x)))$$`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Feedforward neural networks",
            content: `A feedforward neural network is a composite function of multiple variables, consisting of many linear and nonlinear functions.

Example:

$$y = f(w_1x_1 + w_2x_2 + b_1) \\to y = f(g(x_1, x_2))$$

$$y = f(w_5f(w_1x_1 + w_2x_2 + b_1) + w_6f(w_3x_1 + w_4x_2 + b_2) + b_3)$$

where $f$ is a nonlinear activation function, such as tanh, ReLU, etc.

$w$: weight, $b$: bias. Sometimes, all of them are called weights or trainable parameters.
Feedforward neural network = multilayer perceptron = fully connected network.`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Layer-wise computation",
            content: `Instead of computing:

$$y = f(w_5f(w_1x_1 + w_2x_2 + b_1) + w_6f(w_3x_1 + w_4x_2 + b_2) + b_3)$$

The above equation can be written as:

$$\\begin{aligned} h_1 &= f(w_1x_1 + w_2x_2 + b_1) \\\\ h_2 &= f(w_3x_1 + w_4x_2 + b_2) \\\\ y &= f(w_5h_1 + w_6h_2 + b_3) \\end{aligned}$$

which is a neural network with one hidden layer containing two neurons (or nodes).`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Matrix and vector computations are faster",
            content: `$$\\begin{aligned} h_1 &= f(w_1x_1 + w_2x_2 + b_1) \\\\ h_2 &= f(w_3x_1 + w_4x_2 + b_2) \\\\ y &= f(w_5h_1 + w_6h_2 + b_3) \\end{aligned}$$

It can be written as:

$$H_1 = \\begin{bmatrix} h_1 \\\\ h_2 \\end{bmatrix} = f\\left(\\begin{bmatrix} w_1 & w_2 \\\\ w_3 & w_4 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} + \\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix}\\right) = f(W_1X + B_1)$$

$$y = f\\left(\\begin{bmatrix} w_5 & w_6 \\end{bmatrix} \\begin{bmatrix} h_1 \\\\ h_2 \\end{bmatrix} + b_3\\right) = f(W_2H_1 + B_2)$$

Or:

$$H_1 = [h_1 \\quad h_2] = f\\left([x_1 \\quad x_2] \\begin{bmatrix} w_1 & w_3 \\\\ w_2 & w_4 \\end{bmatrix} + [b_1 \\quad b_2]\\right) = f(XW_1 + B_1)$$

$$y = f\\left([h_1 \\quad h_2] \\begin{bmatrix} w_5 \\\\ w_6 \\end{bmatrix} + b_3\\right) = f(H_1W_2 + B_2)$$`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Adding more hidden layers",
            content: `A feedforward neural network with 2 inputs, 4 hidden layers each containing 20 nodes, and 1 output:

$$X = [x \\quad y]$$
$$H_1 = f(XW_1 + B_1)$$
$$H_2 = f(H_1W_2 + B_2)$$
$$H_3 = f(H_2W_3 + B_3)$$
$$H_4 = f(H_3W_4 + B_4)$$
$$u = f(H_4W_5 + B_5)$$

$W_1$ is a $2 \\times 20$ matrix.
Sizes of the other weight and bias matrices?
Also valid for vector inputs $x$ and $y$.`,
            align: "left",
            img: ""
        },
        {
            type: "image",
            title: "Architecture: Adding more hidden layers",
            content: "",
            align: "center",
            img: "image/adding-more-hidden-layer.png"
        },
        {
            type: "text",
            title: "Example",
            content: `The basic application of neural networks is function approximation or regression.

Approximating $u(x) = \\sin(4\\pi x), \\quad x \\in [0, 1]$.
Finding the neural network function $u(x, W)$ using optimization.
Choose some collocation points: $x_k = 0.01 \\times k, \\quad k = 0, 1, \\dots, 100$.
Unknowns: the weights $W$.

Loss function:
$$L(W) = MSE$$
where
$$MSE = \\frac{1}{n} \\sum_{k=1}^n \\left(u(x_k, W) - u_{true}(x_k)\\right)^2$$

Standard optimizer, gradient descent:
$$W_{new} = W_{old} - \\mu \\nabla L(W)$$

Quasi-Newton: the BFGS algorithm.
Optimization: BFGS algorithm.`,
            align: "left",
            img: ""
        },
        {
            type: "image",
            title: "Result",
            content: `Loss: 3.80874e-06`,
            align: "center",
            img: "image/result-feed.png"
        },
        referencesItem
    ],

    bab_2: [
        {
            type: "text",
            title: "Differential equations",
            content: `Ordinary differential equation (ODE). The one-dimensional Bratu equation:

$$u_{xx} + C e^u = 0, \\quad x \\in [0, 1], \\quad u(0) = 0, \\quad u(1) = 0$$

The objective is to approximate the solution $u(x)$ across the domain.

Partial differential equation (PDE). The Burgers equation:

$$u_t + u u_x - \\frac{0.01}{\\pi} u_{xx} = 0, \\quad x \\in [-1, 1], \\quad t \\in [0, 1]$$
$$u(x, 0) = -\\sin(\\pi x), \\quad u(-1, t) = u(1, t) = 0$$

The objective is to approximate the solution $u(x, t)$ across the domain.`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Common solvers/methods",
            content: `Time-independent differential equations, $u(x), u(x, y)$:
• Finite difference method
• Finite element method
• Spectral method

Time-dependent differential equations, $u(x, t)$: time integration + spatial derivative/discretization:
• Time integration:
  - Euler method
  - Runge–Kutta method
  - ode45 (MATLAB)
• Spatial derivative/discretization:
  - Finite difference method
  - Finite element method
  - Spectral method`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Example: finite difference method",
            content: `The one-dimensional Bratu equation:

$$u_{xx} + C e^u = 0, \\quad x \\in [0, 1], \\quad u(0) = 0, \\quad u(1) = 0$$

$C = 2$

Analytical solution:
$$u(x) = 2 \\ln\\left( \\frac{\\cosh \\theta}{\\cosh(\\theta(1 - 2x))} \\right)$$
where $\\theta \\approx 0.589387763469351$.

Finding the approximation $u(x_k) = u_k$ using finite difference method (FDM).
Divide the domain $[0, 1]$ into $n = 100$ subintervals. Choose $h = 1/n$.
Take collocation/grid points: $x_k = 0.01 \\times k, \\quad k = 1, 2, \\dots, 99$.
Unknowns: $u_k, \\quad k = 1, 2, \\dots, 99$.
Set $u_0 = 0, \\quad u_{100} = 0$.`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Example: finite difference method",
            content: `Discretization of the Bratu equation:

$$u_{xx}(x_k) + C e^{u(x_k)} = 0, \\quad k = 1, 2, \\dots, 99$$

Approximating $u_{xx}(x_k)$ using the central finite difference formula:

$$u_{xx}(x_k) \\approx \\frac{u_{k+1} - 2u_k + u_{k-1}}{h^2}$$

New system of nonlinear equations:

$$\\frac{u_{k+1} - 2u_k + u_{k-1}}{h^2} + C e^{u_k} = 0, \\quad k = 1, 2, \\dots, 99$$

Optimization: the Levenberg-Marquardt algorithm.`,
            align: "left",
            img: ""
        },
        {
            type: "image",
            title: "Result",
            content: "",
            align: "center",
            img: "image/result-different.png"
        },
        referencesItem
    ],

    bab_3: [
        {
            type: "text",
            title: "Physics-Informed Neural Networks (PINNs)",
            content: `PINNs: using a feedforward neural network to approximate the solutions of differential equations.

The Burgers equation:

$$u_t + u u_x - \\frac{0.01}{\\pi} u_{xx} = 0, \\quad x \\in [-1, 1], \\quad t \\in [0, 1]$$
$$u(x, 0) = -\\sin(\\pi x), \\quad u(-1, t) = u(1, t) = 0$$

The solution is approximated by a continuous neural network function with two hidden layers:

$$u(x, t, W) = \\sigma\\left(\\sigma([x \\quad t]W_1 + B_1)W_2 + B_2\\right)W_3 + B_3$$

Unknowns: the weights $W$.`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Collocation points and loss function",
            content: `Choose some random/grid interior points: $\{x_k^i, t_k^i\}, \\quad k = 1, \\dots, n_i$.
Choose some random/grid boundary/initial points: $\{x_k^b, t_k^b\}, \\quad k = 1, \\dots, n_b$.

Loss function:
$$L(W) = MSE_i + MSE_b$$

where the PDE residual is:
$$MSE_i = \\frac{1}{n_i} \\sum_{k=1}^{n_i} \\left( u_t(x_k^i, t_k^i, W) + u(x_k^i, t_k^i, W) u_x(x_k^i, t_k^i, W) - \\frac{0.01}{\\pi} u_{xx}(x_k^i, t_k^i, W) \\right)^2$$

and the boundary/initial residual is:
$$MSE_b = \\frac{1}{n_b} \\sum_{k=1}^{n_b} \\left( u(x_k^b, t_k^b, W) - u_{true}(x_k^b, t_k^b) \\right)^2$$`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Derivatives with respect to x and t",
            content: `Rewriting the neural network operations:

$$X = [x \\quad t], \\quad h_1 = XW_1 + B_1, \\quad H_1 = \\sigma(h_1), \\quad h_2 = H_1W_2 + B_2, \\quad H_2 = \\sigma(h_2), \\quad u = H_2W_3 + B_3$$

Chain rule:

With respect to $t$ ($\\partial_t$):
$$X_t = [0 \\quad 1], \\quad h_{1,t} = X_t W_1, \\quad H_{1,t} = \\sigma'(h_1) \\cdot h_{1,t}, \\quad h_{2,t} = H_{1,t} W_2, \\quad H_{2,t} = \\sigma'(h_2) \\cdot h_{2,t}, \\quad u_t = H_{2,t} W_3$$

With respect to $x$ ($\\partial_x$):
$$X_x = [1 \\quad 0], \\quad h_{1,x} = X_x W_1, \\quad H_{1,x} = \\sigma'(h_1) \\cdot h_{1,x}, \\quad h_{2,x} = H_{1,x} W_2, \\quad H_{2,x} = \\sigma'(h_2) \\cdot h_{2,x}, \\quad u_x = H_{2,x} W_3$$

With respect to $x$ second derivative ($\\partial_{xx}$):
$$X_{xx} = [0 \\quad 0], \\quad h_{1,xx} = X_{xx} W_1, \\quad H_{1,xx} = \\sigma''(h_1) \\cdot h_{1,x}^2 + \\sigma'(h_1) \\cdot h_{1,xx}$$
$$h_{2,xx} = H_{1,xx} W_2, \\quad H_{2,xx} = \\sigma''(h_2) \\cdot h_{2,x}^2 + \\sigma'(h_2) \\cdot h_{2,xx}, \\quad u_{xx} = H_{2,xx} W_3$$`,
            align: "left",
            img: ""
        },
        {
            type: "image",
            title: "Architecture of PINNs",
            content: "",
            align: "center",
            img: "image/architecture-pinn.png"
        },
        {
            type: "text",
            title: "Example (Forward Problem)",
            content: `The one-dimensional Bratu equation:

$$u_{xx} + C e^u = 0, \\quad x \\in [0, 1], \\quad u(0) = 0, \\quad u(1) = 0$$

$C = 2$

Analytical solution:
$$u(x) = 2 \\ln\\left( \\frac{\\cosh \\theta}{\\cosh(\\theta(1 - 2x))} \\right)$$
where $\\theta \\approx 0.589387763469351$.

Choose some random interior points: $x_k^i \\in (0, 1), \\quad n_i = 99$.
Two boundary points: $x_1^b = 0, \\quad x_2^b = 1, \\quad n_b = 2$.`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Example (Loss Function)",
            content: `Loss function:

$$L(W) = MSE_i + MSE_b$$

where
$$MSE_i = \\frac{1}{n_i} \\sum_{k=1}^{n_i} \\left( u_{xx}(x_k^i, W) + 2 e^{u(x_k^i, W)} \\right)^2$$

and
$$MSE_b = \\frac{1}{n_b} \\sum_{k=1}^{n_b} \\left( u(x_k^b, W) - 0 \\right)^2$$

Or:
$$L(W) = MSE_i + \\alpha MSE_b$$
where $\\alpha$ balances the two terms.

Optimization: BFGS algorithm`,
            align: "left",
            img: ""
        },
        {
            type: "image",
            title: "Result",
            content: `Loss: 2.47038e-07`,
            align: "center",
            img: "image/result-forward.png"
        },
        {
            type: "text",
            title: "Advantages of PINNs",
            content: `• Mesh (or grid)-free
• Efficient inverse problems (or parameter estimation)
• Automatic differentiation
• Unified framework: ODEs, 2D PDEs, 3D PDEs
• Hard constraint: enforce the initial and boundary conditions directly into the network structure:

$$u(x, t, W) = \\tilde{u}(x, t, W) \\cdot p(x, t) + q(x)$$`,
            align: "left",
            img: ""
        },
        referencesItem
    ],

    bab_4: [
        {
            type: "text",
            title: "Example (Inverse Problems)",
            content: `The one-dimensional Bratu equation:

$$u_{xx} + \\lambda_1 e^{\\lambda_2 u / 2} = 0, \\quad x \\in [0, 1], \\quad u(0) = 0, \\quad u(1) = 0$$

$C = 1$. True values: $\\lambda_1 = 1$ and $\\lambda_2 = 2$.

Objective: Given partial observations of the solution (data) and the known structure of the differential equation, the objective is to identify $\\lambda$ while simultaneously approximating the solution $u$.

Given: $\{x_k, u(x_k)\}, \\quad k = 1, \\dots, n$.`,
            align: "left",
            img: ""
        },
        {
            type: "text",
            title: "Example (Inverse Problems: Loss Function)",
            content: `Loss function:

$$L(W, \\lambda_1, \\lambda_2) = MSE_{de} + MSE_{data}$$

where the differential equation residual:
$$MSE_{de}(W, \\lambda_1, \\lambda_2) = \\frac{1}{n} \\sum_{k=1}^n \\left( u_{xx}(x_k, W) + \\lambda_1 e^{\\lambda_2 u(x_k, W) / 2} \\right)^2$$

and
$$MSE_{data}(W) = \\frac{1}{n} \\sum_{k=1}^n \\left( u(x_k, W) - u_{true}(x_k) \\right)^2$$

Or by considering least squares problem $F = [F_{de}; F_{data}]$ where:
$$F_{de} = u_{xx}(x_k, W) + \\lambda_1 e^{\\lambda_2 u(x_k, W) / 2}$$
$$F_{data} = u(x_k, W) - u_{true}(x_k)$$

Optimization: the Levenberg-Marquardt algorithm`,
            align: "left",
            img: ""
        },
        {
            type: "image",
            title: "Result",
            content: `Loss: 9.1483e-08`,
            align: "center",
            img: "image/result-inverse.png"
        },
        referencesItem
    ]
};

if (typeof window !== "undefined") {
    window.content = content;
    window.chapters = chapters;
    window.referencesItem = referencesItem;
}