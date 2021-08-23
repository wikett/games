<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="pt-12 bg-gray-50 sm:pt-16">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Trusted by developers from over 80 planets
        </h2>
        <p class="mt-3 text-xl text-gray-500 sm:mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          repellat laudantium.
        </p>
      </div>
    </div>
    <div class="pb-12 mt-10 bg-white sm:pb-16">
      <div class="relative">
        <div class="absolute inset-0 h-1/2 bg-gray-50" />
        <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <dl class="bg-white rounded-lg shadow-lg sm:grid sm:grid-cols-3">
              <div
                class="flex flex-col p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500"
                >
                  Pepperoni
                </dt>
                <dd class="order-1 text-5xl font-extrabold text-indigo-600">
                  100%
                </dd>
              </div>
              <div
                class="flex flex-col p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500"
                >
                  Delivery
                </dt>
                <dd class="order-1 text-5xl font-extrabold text-indigo-600">
                  24/7
                </dd>
              </div>
              <div
                class="flex flex-col p-6 text-center border-t border-gray-100 sm:border-0 sm:border-l"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500"
                >
                  Calories
                </dt>
                <dd class="order-1 text-5xl font-extrabold text-indigo-600">
                  100k
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>
