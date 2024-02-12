package main

func Sum(numbers []int) int {
	sum := 0
	for _, number := range numbers {
		sum += number
	}
	return sum
}

func SumAll(numbersToSum ...[]int) (sums []int) {

	for _, numbers := range numbersToSum {
		sums = append(sums, Sum(numbers))
	}

	return sums
}

func SumTails(numbersToSum ...[]int) (sums []int) {

	for _, n := range numbersToSum {
		tail := n[1:]
		sums = append(sums, Sum(tail))
	}
	return sums
}

func SumHeads(numbersToSum ...[]int) (sums []int) {
	for _, n := range numbersToSum {
		head := n[:len(n)-1]
		sums = append(sums, Sum(head))
	}
	return sums
}
