"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/layout/theme-provider";

interface ShaderPlaneProps {
	vertexShader: string;
	fragmentShader: string;
	uniforms: { [key: string]: { value: unknown } };
}

const ShaderPlane = ({
	vertexShader,
	fragmentShader,
	uniforms,
}: ShaderPlaneProps) => {
	const meshRef = useRef<THREE.Mesh>(null);
	const { size } = useThree();

	useFrame((state) => {
		if (meshRef.current) {
			const material = meshRef.current.material as THREE.ShaderMaterial;
			material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
			material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
		}
	});

	return (
		<mesh ref={meshRef}>
			<planeGeometry args={[2, 2]} />
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
				side={THREE.FrontSide}
				depthTest={false}
				depthWrite={false}
				transparent
			/>
		</mesh>
	);
};

interface ShaderBackgroundProps {
	vertexShader?: string;
	fragmentShader?: string;
	uniforms?: { [key: string]: { value: unknown } };
	className?: string;
}

const COLOR_PRESETS = {
	dark: {
		shadow: [0.031, 0.035, 0.043] as const,
		highlight: [0.055, 0.059, 0.071] as const,
	},
	light: {
		shadow: [0.965, 0.965, 0.969] as const,
		highlight: [0.9, 0.9, 0.91] as const,
	},
} as const;

const Background = ({
	vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
    gl_Position = vec4(position, 1.0);
    }
  `,
	fragmentShader = `
    precision highp float;

    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;
    uniform sampler2D u_channel0;
    uniform vec3 u_colorShadow;
    uniform vec3 u_colorHighlight;

    float rand(vec2 p) {
	return fract(sin(dot(p, vec2(12.543,514.123)))*4732.12);
    }

    float noise(vec2 p) {
	vec2 f = smoothstep(0.0, 1.0, fract(p));
	vec2 i = floor(p);

	float a = rand(i);
	float b = rand(i+vec2(1.0,0.0));
	float c = rand(i+vec2(0.0,1.0));
	float d = rand(i+vec2(1.0,1.0));

	return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);

    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        float n = 2.0;
        vec2 uv = fragCoord/u_resolution.y;
        vec2 uvp = fragCoord/u_resolution.xy;
        uv += 0.75*noise(uv*3.0+u_time/2.0+noise(uv*7.0-u_time/3.0)/2.0)/2.0;

        float grid = (mod(floor((uvp.x)*u_resolution.x/n),2.0)==0.0?1.0:0.0) *
                     (mod(floor((uvp.y)*u_resolution.y/n),2.0)==0.0?1.0:0.0);

        vec3 col = mix(u_colorShadow, u_colorHighlight,
                       5.0 * vec3(pow(1.0-noise(uv*4.0-vec2(0.0, u_time/2.0)), 5.0)));

        col = pow(col, vec3(1.0));

        float alpha = grid;
        fragColor = vec4(col, alpha);
    }

    void main() {
        vec4 fragColor;
        vec2 fragCoord = vUv * u_resolution.xy;
        mainImage(fragColor, fragCoord);
        gl_FragColor = fragColor;
    }

`,
	uniforms,
	className = "absolute inset-0 w-full h-full",
}: ShaderBackgroundProps) => {
	const { theme } = useTheme();
	const initialTheme = useRef(theme);

	const shaderUniforms = useMemo(() => {
		const palette = COLOR_PRESETS[initialTheme.current];
		const [shadowR, shadowG, shadowB] = palette.shadow;
		const [highlightR, highlightG, highlightB] = palette.highlight;
		const baseUniforms = {
			u_time: { value: 0 },
			u_resolution: { value: new THREE.Vector3(1, 1, 1) },
			u_colorShadow: {
				value: new THREE.Vector3(shadowR, shadowG, shadowB),
			},
			u_colorHighlight: {
				value: new THREE.Vector3(highlightR, highlightG, highlightB),
			},
		};

		return { ...baseUniforms, ...(uniforms ?? {}) };
	}, [uniforms]);

	useEffect(() => {
		const palette = COLOR_PRESETS[theme];
		const [shadowR, shadowG, shadowB] = palette.shadow;
		const [highlightR, highlightG, highlightB] = palette.highlight;
		const shadowUniform = shaderUniforms.u_colorShadow;
		const highlightUniform = shaderUniforms.u_colorHighlight;

		if (shadowUniform?.value instanceof THREE.Vector3) {
			shadowUniform.value.set(shadowR, shadowG, shadowB);
		}
		if (highlightUniform?.value instanceof THREE.Vector3) {
			highlightUniform.value.set(highlightR, highlightG, highlightB);
		}
	}, [shaderUniforms, theme]);

	return (
		<div className={className}>
			<Canvas
				gl={{ alpha: true }}
				style={{ background: "transparent" }}
				className={className}
			>
				<ShaderPlane
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={shaderUniforms}
				/>
			</Canvas>
		</div>
	);
};

export { Background };
