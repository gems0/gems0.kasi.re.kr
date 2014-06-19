---
title: 'UWIFE Preliminary Data Access'
layout: 'post'
tags: ['uwife','data', 'preliminary']
---

# UWIFE Preliminary Data Access

The observed [Fe II] images (products of CASU pipeline) are available
from the following location. Also available are continuum subtracted
(H-band subtracted) images.

You should connect via "sftp".

* ip : 103.8.230.221
* port : 7774
* login name : gems0_public

The password is our team name (all in small letters). For easy access
to the server, send me (lee.j.joon@gmail.com) your public ssh key.

## Pipeline images

The pipeline processed [Fe II] images are located under "wfcam"
directory, whose listing may look like below.

<pre class="prettyprint">README                             uwife_20120623_20120708
reduced                            uwife_20120623_20120708_old
status                             uwife_20120623_20120708v2
uwife_20120620_20120622            uwife_20120709_20120713
uwife_20120620_20120622_old        uwife_20120724_20120730
uwife_20120620_20120622v2          uwife_20120814_20120824
uwife_20120620_20120622_w44_short  uwife_20120913_20120916
</pre>

The files are further divided into subdirectories according to their
observed dates. For example, **uwife_20120913_20120916** contains

<pre class="prettyprint">w20120913_00153_sf_st_cat.fits  w20120914_01474_sf_st.fit
w20120913_00153_sf_st_conf.fit  w20120914_01486_sf_st_cat.fits
w20120913_00153_sf_st.fit       w20120914_01486_sf_st_conf.fit
w20120913_00165_sf_st_cat.fits  w20120914_01486_sf_st.fit
...
w20120914_01462_sf_st.fit       w20120916_00239_sf_st_conf.fit
w20120914_01474_sf_st_cat.fits  w20120916_00239_sf_st.fit
w20120914_01474_sf_st_conf.fit
</pre>

The file name represent the date of observation and the run id. Files
ending "_sf_st.fit" are images. These FITS image files have 4
extensions corresponding to 4 chips (w, x, y and z). Note that the
images are rice-compressed. You may find [this
page](http://www.jach.hawaii.edu/UKIRT/observing/cookbooks/wfcam_reduction_cookbook.html)
helpful. Files ending with "_sf_st_cat.fits" are catalog of detected
sources, and the files with "_sf_st_conf.fit" are confidence maps.

For each tile (a single square in [the coverage maps](uwife_status)),
which is about $50'\times50'$, there are 4 fits files where each file contains 4
images, i.e., total of 16 images for a single tile. For example, 4 files associated with tile number 129 are

<pre class="prettyprint">w20120626_00631_sf_st.fit
w20120626_00643_sf_st.fit
w20120626_00655_sf_st.fit
w20120626_00667_sf_st.fit
</pre>

The mapping information between tile number and the associated files can be found in

* [info file](https://dl.dropbox.com/u/178748/uwife/uwife_www/uwife_info_2012.tgz)

You will see files named like **uwife0033_FeII_l15_50:129.info** which
contains lines similar to below.

<pre class="prettyprint">[FeII]
0_0 : w20120626_00631_sf_st.fit
1_0 : w20120626_00643_sf_st.fit
0_1 : w20120626_00655_sf_st.fit
1_1 : w20120626_00667_sf_st.fit
....
w20120626_00631_sf_st.fit : sftp://gems0_public@103.8.230.221:wfcam/uwife_20120623_20120708/w20120626_00631_sf_st.fit
....
</pre>

It lists associated file names for each filter, and the urls to
download those files. **0_0**, **0_1**, **1_0** and **1_1** are
sequence name, i.e., a single tile is consist of 4 sequences.

## Continuum subtracted images

Continuum-subtracted images are available under
**cluster_results/compressed** directory of the above server. Both [Fe
II] and H$_{2}$ 
images are available (but some are missing due to
various reasons). The number of continuum-subtracted [Fe II] images is
2248, which corresponds to about ~150 tiles (for some tiles, not all
16 images are availble). The number is similar to H$_{2}$. Files are
named like below.

<pre class="prettyprint">uwife000_FeII_S0_0v0_w_starsub.fits.fz
uwife000_FeII_S0_0v0_x_starsub.fits.fz
uwife000_FeII_S0_0v0_y_starsub.fits.fz
....
uwife061_FeII_S1_1v0_y_starsub.fits.fz
uwife061_FeII_S1_1v0_z_starsub.fits.fz
uwife061_H2_S0_0v0_w_starsub.fits.fz
uwife061_H2_S0_0v0_x_starsub.fits.fz
....
</pre>

The three digit number at the beginning is the tile number, followed
by the filter nane, sequence number and chip id.

For example, **uwife061_FeII_S1_1v0_z_starsub.fits.fz** represents

* tile number : 61
* sequence : 1_1
* chip id : z

Note that there are 4 chips (corresponds to 4 images in the pipeline
fits file), which are labeled as **w**, **x**, **y** and **z**.

## Find image you want

Under **/cluster_results**, you will also find two files.

* uwife_msb_id_target_name.txt
* wfcam_fov.txt

"uwife_msb_id_target_name.txt" contains nominal position of each tile.

"Wfcam_fov" contains fov of each array (for each sequence) relative to
the nominal position in "uwife_msb_id_target_name.txt". The coordinate
need to be calculated in Ra.Dec.

Thus, using these files you can figure out which tile contains your target.

**/cluster_results/find_msb.tgz** contains a python script that does
  that for you (the search algorithm is quite naive thus slow).

If you untar **/cluster_results/find_msb.tgz**, you will see following files.

To search a point, provide ra & dec.

<pre class="prettyprint"> > ./find_uwife.py 272.8625 -19.416
 7 1_0 y
</pre>

The output is tile numner, sequence, and chip id, i.e., for above
position you need to take a look at
**uwife007_FeII_S1_0v0_y_starsub.fits.fz** for the
continuum-subtracted FeII image. For a pipeline-processed image,
you can find an appropriate file from the info files. Take a look at
**uwife0007_FeII_lm2_15\:77.info**.

<pre class="prettyprint">[FeII]
0_0 : w20120620_00780_sf_st.fit
1_0 : w20120620_00792_sf_st.fit
0_1 : w20120620_00804_sf_st.fit
1_1 : w20120620_00816_sf_st.fit
...
</pre>

And **w20120620_00792_sf_st.fit** is the right file. Since, your
source is in chip **y**, you have to look at 3rd extension.

* All units must be in degree.
* it may return multiple images.
* it may return images yet to be observed, i.e., you need to check the existence of such images by yourself.

Similarly, to seach for images that overlaps with a given rectangle,
provide ra & dec of center together with width and height (all in degrees).

<pre class="prettyprint"> > ./find_uwife.py 272.8625 -19.416 0.05 0.05
 7 1_0 y
 7 1_1 z
</pre>
