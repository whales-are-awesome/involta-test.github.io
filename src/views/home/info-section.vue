<template>
    <div class="relative">
        <div class="container mb-40 pt-40">
            <div class="max-w-[668px]">
                <h4 class="title-h4 mb-9 md:text-md-h-2 md:mb-[40px] md:max-w-[504px] sm:text-sm-h-1 sm:mb-[36px]">
                    OuterCircle is extendable DAO-tooling ecosystem
                </h4>
                <p class="text-primary-400 md:text-base md:max-w-[352px]">
                    OuterCircle unifies DAO-centric apps built by companies and independent developers and allows them to
                    co-exist in one unified space.
                    <br><br>
                    OuterCircle doesn’t force DAOs to exist in isolated spaces of DAO-constructors, doesn’t limit them to a
                    predetermined set of toolings, and allows them not to rely on B2B solutions to grow. Take the full control,
                    stay decentralized!
                    <br><br>
                    For the developers, OuterCircle creates a new market of applications, created especially for decentralized
                    communities, and provides a standard and an SDK to build them.
                </p>
            </div>
            <div class="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none -z-1">
                <div class="translate-x-[148px] -translate-y-[20px] md:-translate-x-[50px] md:translate-y-[98px] sm:w-[459px] sm:h-[459px]">
                    <kinesis-container event="scroll">
                        <kinesis-element :strength="30">
                            <img
                                class="w-[885px] translate-x-[430px] max-w-none md:w-[680px] sm:hidden"
                                :src="require('@/assets/images/home/info/main-image.png')"
                                alt="image"
                            >
                        </kinesis-element>
                        <img
                            class="absolute inset-0 -z-1 translate-x-[280px] sm:translate-x-[130px]"
                            :src="require('@/assets/images/home/info/gradient.png')"
                            alt="gradient"
                        >
                        <div class="sm:hidden">
                            <img
                                class="w-[384px] absolute right-[5px] top-[420px] md:w-[220px] md:top-[364px] md:right-[-40px]"
                                :src="require('@/assets/images/home/info/logo.png')"
                                alt="logo"
                            >
                            <img
                                class="absolute top-[245px] right-[320px] w-[47px] md:w-[40px] md:top-[165px] md:right-[95px]"
                                :src="require('@/assets/images/home/info/ball-1.png')"
                                alt="ball-1"
                            >
                            <img
                                class="absolute top-[350px] right-[336px] w-[59px] md:w-[40px] md:top-[265px] md:right-[150px]"
                                :src="require('@/assets/images/home/info/ball-2.png')"
                                alt="ball-2"
                            >
                            <img
                                class="absolute bottom-[224px] right-[123px] w-[60px] md:hidden"
                                :src="require('@/assets/images/home/info/ball-3.png')"
                                alt="ball-3"
                            >
                            <img
                                class="absolute bottom-[112px] right-[-51px] w-[73px] md:hidden"
                                :src="require('@/assets/images/home/info/ball-4.png')"
                                alt="ball-4"
                            >
                        </div>
                    </kinesis-container>
                </div>
            </div>
        </div>
    </div>
</template>
