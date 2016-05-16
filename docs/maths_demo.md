# Mathematical Equations Test

This is an inline equation $f = ma$. The following are display maths:

\begin{equation}
    \label{eq1}
    x = \alpha + \beta
\end{equation}

asdlfkjsldf

\begin{equation}
    \mathbf{V}_{1} \times \mathbf{V}_{2} =
    \begin{vmatrix}
        \mathbf{i} & \mathbf{j} & \mathbf{k} \\
        \frac{\partial X}{\partial u} & \frac{\partial Y}{\partial u} & 0 \\
        \frac{\partial X}{\partial v} & \frac{\partial Y}{\partial v} & 0 \\
    \end{vmatrix}
\end{equation}


## Maxwell's Equations:

\begin{equation}
	\left \{
		\begin{aligned}
			\nabla \times \vec{\mathbf{B}} - \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\\\
			\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\\\
			\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\\\
			\nabla \cdot \vec{\mathbf{B}} & = 0
		\end{aligned}
	\right.
\end{equation}



## Matricies

\begin{equation}
	\begin{bmatrix}
		a & b \\
		c & d
	\end{bmatrix}
\end{equation}

\begin{equation}
	\mathbf{I}_n = \left . \left(
					\vphantom{
					    \begin{array}{c} 1 \\ 1 \\ 1 \\ 1 \\ 1 \end{array}
					}
					\smash{\underbrace{
						\begin{array}{ccccc}
								1 & 0 & 0 & \cdots & 0 \\
								0 & 1 & 0 & \cdots & 0 \\
								0 & 0 & 1 & \cdots & 0 \\
								\vdots&&&\ddots& \\
								0&0&0&\cdots &1
						\end{array}
						}_{n\text{ columns}}}
				\right)\right\}
				\,n\text{rows}
\end{equation}



## Referencing Equations
To refer to an equation you simply have to write the following:

	Eq $\ref{eq1}$

Where Eq $\ref{eq1}$ is defined as:

	\[
		\label{eq1}
		x = \alpha + \beta
	\]

As you would in latex.
