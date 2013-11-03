#include <ccv.h>
int main(int argc, char** argv)
{
	ccv_dense_matrix_t* image = 0;
	ccv_read(argv[1], &image, CCV_IO_GRAY | CCV_IO_ANY_FILE);
	ccv_bbf_classifier_cascade_t* cascade = ccv_bbf_read_classifier_cascade(argv[2]);
	ccv_array_t* faces = ccv_bbf_detect_objects(image, &cascade, 1, ccv_bbf_default_params);
	int i;
	for (i = 0; i < faces->rnum; i++)
	{
		ccv_comp_t* face = (ccv_comp_t*)ccv_array_get(faces, i);
		printf("%d %d %d %d\n", face->rect.x, face->rect.y, face->rect.width, face->rect.height);
	}
	ccv_array_free(faces);
	ccv_bbf_classifier_cascade_free(cascade);
	ccv_matrix_free(image);
	return 0;
}
