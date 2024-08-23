import v8 from 'v8';


const heapStats = v8.getHeapStatistics();

console.log('Total heap size (bytes):',            heapStats.total_heap_size           );
console.log('Total heap size executable (bytes):', heapStats.total_heap_size_executable);
console.log('Total physical size (bytes):',        heapStats.total_physical_size       );
console.log('Total available size (bytes):',       heapStats.total_available_size      );
console.log('Used heap size (bytes):',             heapStats.used_heap_size            );
console.log('Heap size limit (bytes):',            heapStats.heap_size_limit           );
